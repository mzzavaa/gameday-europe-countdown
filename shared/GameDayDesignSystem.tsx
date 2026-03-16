import { AbsoluteFill, Img } from "remotion";
import React, { useState, useCallback } from "react";

// Custom staticFile that works with Vite's base path
export const staticFile = (path: string): string => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path}`.replace(/\/+/g, "/").replace(":/", "://");
};

// ── Design Palette ──
export const GD_DARK = "#0c0820";
export const GD_PURPLE = "#6c3fa0";
export const GD_VIOLET = "#8b5cf6";
export const GD_PINK = "#d946ef";
export const GD_ACCENT = "#c084fc";
export const GD_ORANGE = "#ff9900";
export const GD_GOLD = "#fbbf24";

// ── Timing Constants ──
export const FPS = 30;
export const MIN = 60 * FPS; // 1800 frames per minute

// Offsets in minutes from event start (17:30 CET)
// The event spans 4+ timezones — all times are CET reference
export const EVENT_START = 0; // 17:30 CET — Pre-Show begins (optional local setup)
export const STREAM_START = 30; // 18:00 CET — Live stream starts
export const GAME_START = 60; // 18:30 CET — GameDay game begins
export const GAME_END = 180; // 20:30 CET — Game ends, closing ceremony
export const EVENT_END = 210; // 21:00 CET — Stream ends with music

// ── Typography Scale ──
export const TYPOGRAPHY = {
  h1: 104,
  h2: 72,
  h3: 42,
  h4: 36,
  h5: 28,
  h6: 24,
  body: 20,
  bodySmall: 18,
  caption: 16,
  captionSmall: 14,
  label: 13,
  labelSmall: 12,
  overline: 11,
  stat: 80,
  timer: 64,
  timerSmall: 56,
  flag: 48,
} as const;

// ── Spring Animation Presets ──
export const springConfig = {
  entry: { damping: 12, stiffness: 100 },
  exit: { damping: 15, stiffness: 80 },
  emphasis: { damping: 8, stiffness: 120 },
};

export function staggeredEntry(
  baseFrame: number,
  index: number,
  stagger: number = 20,
): number {
  return baseFrame + index * stagger;
}

// ── Time Formatting ──
export function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ── Cross-Composition Countdown ──
/**
 * Returns seconds remaining until targetTime given the current frame
 * and the composition's offset within the event timeline.
 *
 * @param compositionFrame - Current frame within this composition (0-based)
 * @param compositionStartOffset - Minutes from event start (17:30) when this composition begins
 * @param targetTime - Minutes from event start (17:30) for the countdown target
 * @param fps - Frames per second (30)
 * @returns Non-negative integer: seconds remaining until targetTime
 */
export function calculateCountdown(
  compositionFrame: number,
  compositionStartOffset: number,
  targetTime: number,
  fps: number,
): number {
  return Math.max(
    0,
    Math.floor(targetTime * 60 - compositionStartOffset * 60 - compositionFrame / fps),
  );
}

// ── Data Models ──
export interface ScheduleSegment {
  label: string;
  startFrame: number;
  endFrame: number;
  speakers?: string;
}

export type CardState = "active" | "upcoming" | "completed";

// ── Segment Helpers ──
export function getCardState(frame: number, segment: ScheduleSegment): CardState {
  if (frame > segment.endFrame) return "completed";
  if (frame >= segment.startFrame && frame <= segment.endFrame) return "active";
  return "upcoming";
}

export function getActiveSegment(
  frame: number,
  segments: ScheduleSegment[],
): ScheduleSegment | undefined {
  return segments.find((s) => frame >= s.startFrame && frame <= s.endFrame);
}

export function getPhaseInfo(
  frame: number,
  segments: ScheduleSegment[],
): { name: string; progress: number } {
  const seg = segments.find((s) => frame >= s.startFrame && frame <= s.endFrame);
  if (!seg) {
    const last = segments[segments.length - 1];
    return { name: last.label, progress: 1 };
  }
  const progress =
    (frame - seg.startFrame) / (seg.endFrame - seg.startFrame + 1);
  return { name: seg.label, progress: Math.min(1, Math.max(0, progress)) };
}

// ── Background Layer ──
const BG_IMAGE = staticFile(
  "AWSCommunityGameDayEurope/background_landscape_colour.png",
);

export const BackgroundLayer: React.FC<{ darken?: number }> = ({
  darken = 0.65,
}) => (
  <>
    <Img
      src={BG_IMAGE}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `rgba(12,8,32,${darken})`,
      }}
    />
  </>
);

// ── Hex Grid Overlay ──
export const HexGridOverlay: React.FC = () => (
  <AbsoluteFill style={{ opacity: 0.04 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="hexGrid"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z"
            fill="none"
            stroke={GD_PURPLE}
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexGrid)" />
    </svg>
  </AbsoluteFill>
);

// ── Glass Card ──
export const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: 28,
      boxShadow:
        "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Safe Image Component (handles external URL failures gracefully) ──
export const SafeImg: React.FC<{
  src: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  className?: string;
}> = ({ src, style, fallback, onLoad, className }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
    // Silently fail - no console error spam
  }, []);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(e);
  }, [onLoad]);

  if (hasError) {
    // Return fallback or a placeholder
    if (fallback) return <>{fallback}</>;
    return (
      <div
        style={{
          ...style,
          background: `linear-gradient(135deg, ${GD_PURPLE}40, ${GD_VIOLET}20)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
    );
  }

  return (
    <Img
      src={src}
      style={style}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

// ── Audio Badge ──
export const AudioBadge: React.FC<{ muted: boolean }> = ({ muted }) => {
  const color = muted ? GD_ACCENT : GD_ORANGE;
  return (
    <div style={{ position: "absolute", bottom: 16, right: 36, zIndex: 50 }}>
      <GlassCard
        style={{
          padding: "8px 16px",
          borderRadius: 12,
          border: `1px solid ${color}40`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
            color,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
          }}
        >
          {muted ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <line x1="23" y1="9" x2="17" y2="15" stroke={color} strokeWidth="2" />
              <line x1="17" y1="9" x2="23" y2="15" stroke={color} strokeWidth="2" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill={color}>
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M14.54 7.46a5 5 0 0 1 0 9.08" fill="none" stroke={color} strokeWidth="2" />
              <path d="M18.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke={color} strokeWidth="2" />
            </svg>
          )}
          {muted ? "MUTED" : "AUDIO ON"}
        </div>
      </GlassCard>
    </div>
  );
};
