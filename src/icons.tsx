import React from "react";

const P = "#6c3fa0";
const A = "#c084fc";

const s = { strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const I: React.FC<{ sz?: number; c?: string; children: React.ReactNode }> = ({ sz = 18, c = A, children }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" stroke={c} {...s}>{children}</svg>
);

export const AudioIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = "#22c55e" }) => (
  <I sz={size} c={color}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></I>
);
export const MutedIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = P }) => (
  <I sz={size} c={color}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></I>
);
export const GamepadIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color }) => (
  <I sz={size} c={color}><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" /></I>
);
export const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color }) => (
  <I sz={size} c={color}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></I>
);
export const CheckCircleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color }) => (
  <I sz={size} c={color}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></I>
);
export const MonitorIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <I sz={size} c={color}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></I>
);
export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <I sz={size} c={color}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></I>
);
export const UsersIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <I sz={size} c={color}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>
);
export const GlobeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color }) => (
  <I sz={size} c={color}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></I>
);
export const ChairIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <I sz={size} c={color}><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 6v3" /><path d="M3 16h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" /><path d="M5 16V9h14v7" /></I>
);
export const CodeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <I sz={size} c={color}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></I>
);
