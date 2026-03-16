import React, { useEffect, useState, useCallback, useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { GameDayPreShowInfoV4 } from "@compositions/compositions/04v4-GameDayStreamPreShowInfo-V4";
import { GameDayMainEventV3 } from "@compositions/compositions/01v3-GameDayStreamMainEvent-V3";
import { GameDayGameplay } from "@compositions/compositions/02-GameDayStreamGameplay-Muted";
import { GameDayClosingCountdown } from "@compositions/compositions/03a-ClosingFixed";
import { CountdownComposition } from "./Countdown";
import {
  EVENT_DATE,
  SCHEDULE,
  TIMEZONE,
  COMPOSITIONS,
} from "./schedule";

type SegmentId = "preshow" | "mainevent" | "gameplay" | "closing" | "end" | "waiting";

/**
 * URL parameters:
 *
 *   ?segment=preshow     → Force a specific segment (preshow|mainevent|gameplay|closing|end|waiting)
 *   ?time=18:05          → Simulate a CET time on event day
 *   ?date=2026-03-17     → Override the event date (use with ?time=)
 *   ?controls=true       → Show operator controls (hidden by default)
 *   ?autoplay=true       → Start in auto mode (production mode)
 *   ?frame=3750          → Start at a specific frame number
 *   ?minute=2            → Start at a specific minute (converted to frames at 30fps)
 *
 * Examples:
 *   http://localhost:5173/                          → Live countdown until event (no controls)
 *   http://localhost:5173/?controls=true            → Show operator controls
 *   http://localhost:5173/?segment=preshow          → Test Pre-Show composition
 *   http://localhost:5173/?segment=closing          → Test Closing composition
 *   http://localhost:5173/?segment=closing&frame=3750 → Test Closing at frame 3750 (prize reveal)
 *   http://localhost:5173/?segment=closing&minute=2   → Test Closing at 2 minutes in
 *   http://localhost:5173/?time=17:45               → Simulate 17:45 CET on event day
 *   http://localhost:5173/?time=20:35               → Simulate Closing time
 *   http://localhost:5173/?autoplay=true            → Production: auto-schedule
 */
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    segment: params.get("segment"),
    time: params.get("time"),
    date: params.get("date"),
    controls: params.get("controls"),
    autoplay: params.get("autoplay"),
    frame: params.get("frame"),
    minute: params.get("minute"),
  };
}

function getCurrentSegment(): SegmentId {
  const { segment: urlSegment, time: urlTime, date: urlDate } = getUrlParams();

  if (urlSegment) {
    const valid: SegmentId[] = ["preshow", "mainevent", "gameplay", "closing", "end", "waiting"];
    if (valid.includes(urlSegment as SegmentId)) return urlSegment as SegmentId;
  }

  let currentDate: string;
  let currentTime: string;

  if (urlTime) {
    currentDate = urlDate ?? EVENT_DATE;
    currentTime = urlTime;
  } else {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    currentDate = `${get("year")}-${get("month")}-${get("day")}`;
    currentTime = `${get("hour")}:${get("minute")}`;
  }

  if (currentDate !== EVENT_DATE && !urlTime) return "waiting";

  for (let i = SCHEDULE.length - 1; i >= 0; i--) {
    if (currentTime >= SCHEDULE[i].start) {
      return SCHEDULE[i].id as SegmentId;
    }
  }
  return "waiting";
}

const SEGMENTS: { id: SegmentId; label: string }[] = [
  { id: "waiting", label: "Countdown" },
  { id: "preshow", label: "0 — Pre-Show" },
  { id: "mainevent", label: "1 — Main Event" },
  { id: "gameplay", label: "2 — Gameplay" },
  { id: "closing", label: "3 — Closing" },
];

const COUNTDOWN_MILESTONES = SCHEDULE.filter((s) => s.id !== "end").map((s) => ({
  label: s.label,
  time: s.start,
  id: s.id,
  desc: s.desc,
}));

export const App: React.FC = () => {
  const urlParams = getUrlParams();
  const isAutoplay = urlParams.autoplay === "true";
  const controlsEnabled = urlParams.controls === "true";

  const [segment, setSegment] = useState<SegmentId>(getCurrentSegment);
  const [override, setOverride] = useState<SegmentId | null>(
    urlParams.segment ? (urlParams.segment as SegmentId) : null
  );
  const [showControls, setShowControls] = useState(controlsEnabled);
  const playerRef = useRef<PlayerRef>(null);

  // Calculate initial frame from URL params (frame takes precedence over minute)
  const getInitialFrame = useCallback(() => {
    if (urlParams.frame) {
      return parseInt(urlParams.frame, 10);
    }
    if (urlParams.minute) {
      // Convert minutes to frames at 30fps
      return parseInt(urlParams.minute, 10) * 30 * 60;
    }
    return 0;
  }, [urlParams.frame, urlParams.minute]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!override) setSegment(getCurrentSegment());
    }, 1000);
    return () => clearInterval(interval);
  }, [override]);

  // Seek to initial frame when player is ready
  useEffect(() => {
    const initialFrame = getInitialFrame();
    if (initialFrame > 0 && playerRef.current) {
      // Small delay to ensure player is mounted
      const timer = setTimeout(() => {
        playerRef.current?.seekTo(initialFrame);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [getInitialFrame]);

  const active = override ?? segment;

  // Esc toggles controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowControls((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleOverride = useCallback((id: SegmentId) => {
    setOverride(id);
    setSegment(id);
    // Update URL params without reload
    const url = new URL(window.location.href);
    url.searchParams.set("segment", id);
    url.searchParams.delete("frame");
    url.searchParams.delete("minute");
    window.history.replaceState({}, "", url.toString());
  }, []);

  const handleAutoMode = useCallback(() => {
    setOverride(null);
    setSegment(getCurrentSegment());
    // Clear segment from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("segment");
    url.searchParams.delete("frame");
    url.searchParams.delete("minute");
    window.history.replaceState({}, "", url.toString());
  }, []);

  // ─── Waiting: Remotion-rendered countdown ────────────────────────
  if (active === "waiting") {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#0c0820", position: "relative" }}>
        <Player
          component={CountdownComposition}
          inputProps={{
            eventDate: EVENT_DATE,
            timezone: TIMEZONE,
            milestones: COUNTDOWN_MILESTONES,
          }}
          durationInFrames={30 * 60 * 60} // 1 hour of frames — effectively infinite
          fps={30}
          compositionWidth={1280}
          compositionHeight={720}
          autoPlay
          loop
          controls={false}
          style={{ width: "100%", height: "100%" }}
        />
        {showControls && <Controls active={active} override={override} onOverride={handleOverride} onAuto={handleAutoMode} />}
      </div>
    );
  }

  if (active === "end") {
    return (
      <div style={screenStyle}>
        <h1 style={{ fontSize: 32, color: "#fbbf24" }}>🎉 Stream Ended</h1>
        <p style={{ fontSize: 18, marginTop: 16, color: "#c084fc" }}>
          Thank you for joining AWS Community GameDay Europe!
        </p>
        {showControls && <Controls active={active} override={override} onOverride={handleOverride} onAuto={handleAutoMode} />}
      </div>
    );
  }

  const comp = COMPOSITIONS[active];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0c0820", position: "relative" }}>
      <Player
        ref={playerRef}
        key={active}
        component={
          active === "preshow" ? GameDayPreShowInfoV4 :
          active === "mainevent" ? GameDayMainEventV3 :
          active === "gameplay" ? GameDayGameplay :
          GameDayClosingCountdown
        }
        inputProps={active === "preshow" ? { loopIteration: 0 } : {}}
        durationInFrames={comp.durationInFrames}
        fps={comp.fps}
        compositionWidth={comp.width}
        compositionHeight={comp.height}
        loop={active === "preshow"}
        autoPlay
        controls
        style={{ width: "100%", height: "100%" }}
        initiallyMuted={active === "preshow" || active === "gameplay"}
      />
      {showControls && <Controls active={active} override={override} onOverride={handleOverride} onAuto={handleAutoMode} />}
    </div>
  );
};

// ─── Operator Controls (extracted) ───────────────────────────────────
const Controls: React.FC<{
  active: SegmentId;
  override: SegmentId | null;
  onOverride: (id: SegmentId) => void;
  onAuto: () => void;
}> = ({ active, override, onOverride, onAuto }) => (
  <div style={controlsStyle}>
    <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4 }}>
      Press <b>Esc</b> to hide • <b>?controls=true</b> to show
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      <button onClick={onAuto} style={{ ...btnStyle, background: !override ? "#6c3fa0" : "#333" }}>
        ⏱ Auto
      </button>
      {SEGMENTS.map((s) => (
        <button
          key={s.id}
          onClick={() => onOverride(s.id)}
          style={{ ...btnStyle, background: active === s.id ? "#8b5cf6" : "#333" }}
        >
          {s.label}
        </button>
      ))}
    </div>
    <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6 }}>
      {override ? `Manual: ${active}` : `Auto mode — current: ${active}`}
    </div>
  </div>
);

const screenStyle: React.CSSProperties = {
  width: "100vw", height: "100vh", display: "flex", flexDirection: "column",
  justifyContent: "center", alignItems: "center", background: "#0c0820", color: "white",
  position: "relative",
};

const controlsStyle: React.CSSProperties = {
  position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.85)",
  padding: "8px 12px", borderRadius: 8, color: "white", fontSize: 13, zIndex: 9999,
};

const btnStyle: React.CSSProperties = {
  border: "none", color: "white", padding: "4px 10px", borderRadius: 4,
  cursor: "pointer", fontSize: 12,
};
