import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { GD_DARK, GD_PURPLE, GD_VIOLET, GD_ACCENT, GD_ORANGE, GD_GOLD, BackgroundLayer, HexGridOverlay, staticFile } from "../shared/GameDayDesignSystem";
import { AudioIcon, MutedIcon, GamepadIcon, CalendarIcon, CheckCircleIcon, MonitorIcon, ClockIcon, UsersIcon, GlobeIcon, ChairIcon, CodeIcon } from "./icons";

const FONT = "'Amazon Ember', 'Inter', system-ui, sans-serif";
const LOGO = staticFile("AWSCommunityGameDayEurope/GameDay_Solid_Logo_for_swag/GameDay Logo Solid White Geometric with text.png");
const COMMUNITY_LOGO = staticFile("AWSCommunityGameDayEurope/AWSCommunityEurope_last_nobackground.png");

interface Milestone { label: string; time: string; id: string; desc: string }
interface CountdownProps { eventDate: string; timezone: string; milestones: Milestone[] }

function msUntil(d: string, t: string) { return Math.max(0, new Date(`${d}T${t}:00`).getTime() - Date.now()); }
function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"), m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"), s: String(s % 60).padStart(2, "0") };
}

const Digit: React.FC<{ v: string; u: string; pulse: number }> = ({ v, u, pulse }) => (
  <div style={{ background: `linear-gradient(180deg, ${GD_PURPLE}40, ${GD_DARK}dd)`, border: `1px solid ${GD_VIOLET}30`, borderRadius: 14, padding: "14px 20px", textAlign: "center", minWidth: 94 }}>
    <div style={{ fontSize: 58, fontWeight: 800, fontFamily: FONT, color: GD_GOLD, textShadow: `0 0 ${20 * pulse}px ${GD_ORANGE}55`, lineHeight: 1 }}>{v}</div>
    <div style={{ fontSize: 13, color: GD_ACCENT, marginTop: 4, textTransform: "uppercase", letterSpacing: 1.5 }}>{u}</div>
  </div>
);

const Sep: React.FC<{ pulse: number }> = ({ pulse }) => (
  <div style={{ fontSize: 46, color: GD_GOLD, opacity: 0.3 + pulse * 0.5, paddingBottom: 18, fontWeight: 300 }}>:</div>
);

export const CountdownComposition: React.FC<CountdownProps> = ({ eventDate, milestones }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.3, 1, 0.3]);
  const anim = (delay: number) => ({
    opacity: interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
    transform: `translateY(${interpolate(frame, [delay, delay + 18], [20, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
  });

  const gameplay = milestones.find((m) => m.id === "gameplay")!;
  const gMs = msUntil(eventDate, gameplay.time);
  const gT = fmt(gMs);
  const gLive = gMs === 0;

  // Descriptions with corrected text color — white with slight transparency instead of purple
  const DESC_COLOR = "rgba(255,255,255,0.65)";

  return (
    <AbsoluteFill style={{ background: GD_DARK, fontFamily: FONT }}>
      <BackgroundLayer darken={0.75} />
      <HexGridOverlay />

      {/* ═══ LEFT: Logos + Hero Countdown ═══ */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 720, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, ...anim(0) }}>
          <Img src={COMMUNITY_LOGO} style={{ height: 100 }} />
          <div style={{ width: 1, height: 60, background: `${GD_PURPLE}55` }} />
          <Img src={LOGO} style={{ height: 140 }} />
        </div>

        <div style={{ ...anim(6), textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 20, fontWeight: 700, color: GD_GOLD, textTransform: "uppercase", letterSpacing: 4, marginBottom: 14 }}>
            <GamepadIcon size={24} color={GD_GOLD} /> Game Starts In
          </div>

          {gLive ? (
            <div style={{ fontSize: 68, fontWeight: 800, color: "#22c55e", textShadow: "0 0 40px #22c55e44" }}>GAME ON</div>
          ) : (
            <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "flex-end" }}>
              {gT.d > 0 && <><Digit v={String(gT.d)} u="days" pulse={pulse} /><Sep pulse={pulse} /></>}
              <Digit v={gT.h} u="hours" pulse={pulse} />
              <Sep pulse={pulse} />
              <Digit v={gT.m} u="min" pulse={pulse} />
              <Sep pulse={pulse} />
              <Digit v={gT.s} u="sec" pulse={pulse} />
            </div>
          )}

          <div style={{ fontSize: 17, color: GD_ACCENT, marginTop: 18, opacity: 0.85 }}>2 hours of competitive cloud gaming</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
            <GlobeIcon size={16} color={DESC_COLOR} />
            <span style={{ fontSize: 15, color: DESC_COLOR }}>53+ User Groups across 20+ Countries in 4+ Timezones</span>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT: Schedule + Checklist ═══ */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 560, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 36px 0 0", marginTop: -20 }}>
        <div style={{ ...anim(14) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 3, marginBottom: 14 }}>
            <CalendarIcon size={18} /> Schedule (CET) — Community GameDay Europe
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {milestones.map((ms) => {
              const remaining = msUntil(eventDate, ms.time);
              const isLive = remaining === 0;
              const t = fmt(remaining);
              const isPreshow = ms.id === "preshow";
              const isGame = ms.id === "gameplay";
              const isMuted = isPreshow || isGame;
              return (
                <div key={ms.id} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "11px 16px", borderRadius: 12,
                  background: isLive ? "#22c55e15" : isGame ? `${GD_GOLD}08` : "rgba(255,255,255,0.03)",
                  border: isLive ? "1px solid #22c55e44" : isGame ? `1px solid ${GD_GOLD}22` : "1px solid rgba(255,255,255,0.05)",
                  opacity: isPreshow ? 0.55 : 1,
                }}>
                  <div style={{ width: 54, textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: isLive ? "#22c55e" : "white" }}>{ms.time}</div>
                    <div style={{ marginTop: 3 }}>{isMuted ? <MutedIcon size={15} /> : <AudioIcon size={15} />}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: isLive ? "#22c55e" : "white" }}>
                      {ms.label}
                      {isPreshow && <span style={{ fontSize: 12, color: DESC_COLOR, fontWeight: 400, fontStyle: "italic", marginLeft: 8 }}>optional</span>}
                    </div>
                    <div style={{ fontSize: 13, color: DESC_COLOR, marginTop: 2 }}>{ms.desc}</div>
                  </div>
                  <div style={{ width: 105, textAlign: "right" }}>
                    {isLive ? (
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#22c55e" }}>LIVE</span>
                    ) : (
                      <span style={{ fontSize: 17, fontWeight: 700, fontFamily: "monospace", color: isGame ? GD_GOLD : GD_ACCENT }}>
                        {t.d > 0 ? `${t.d}d ` : ""}{t.h}:{t.m}:{t.s}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 56, ...anim(22) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: GD_ACCENT, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>
            <CheckCircleIcon size={18} /> Get Ready
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {([
              { icon: <UsersIcon size={17} />, text: "Form your team locally before the stream" },
              { icon: <ChairIcon size={17} />, text: "Be seated with audio ready 5 min before start" },
              { icon: <MonitorIcon size={17} />, text: "Watch the live stream for instructions" },
              { icon: <CodeIcon size={17} />, text: "Team codes distributed locally, then game on" },
              { icon: <ClockIcon size={17} />, text: "Stream returns after 2h for the closing ceremony" },
            ] as const).map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 15, color: "rgba(255,255,255,0.9)" }}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 34,
        background: `linear-gradient(90deg, ${GD_PURPLE}22, ${GD_VIOLET}11, ${GD_PURPLE}22)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: interpolate(frame, [28, 45], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: 1 }}>The first-ever AWS Community GameDay across Europe</span>
      </div>
    </AbsoluteFill>
  );
};
