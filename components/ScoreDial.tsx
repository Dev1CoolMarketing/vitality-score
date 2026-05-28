'use client';

import { useEffect, useState } from 'react';

type LegendRow = {
  label: string;
  value: number;
  max: number;
  swatch: string;
};

type ScoreDialProps = {
  value: number;
  total?: number;
  tag: string;
  legend: LegendRow[];
};

const SIZE = 262;
const RADIUS = 116;
const STROKE = 14;
const CIRC = 2 * Math.PI * RADIUS;
const DURATION = 1500;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ScoreDial({
  value,
  total = 100,
  tag,
  legend,
}: ScoreDialProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(easeOutCubic(t));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 300);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const animatedValue = Math.round(progress * value);
  const offset = CIRC - CIRC * progress * (value / total);

  return (
    <div className="dial-card">
      <div className="dial-head">
        <span className="label">Your Vitality Score</span>
        <span className="live">Tracked in T-SHOTS&trade;</span>
      </div>
      <div className="dial">
        <svg height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE}>
          <defs>
            <linearGradient id="dialArc" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#2E5530" />
              <stop offset="1" stopColor="#7CC07C" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            fill="none"
            r={RADIUS}
            stroke="rgba(236,234,224,.08)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            fill="none"
            r={RADIUS}
            stroke="url(#dialArc)"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth={STROKE}
          />
        </svg>
        <div className="dial-center">
          <span className="dial-num">{animatedValue}</span>
          <span className="dial-of">/ {total}</span>
          <span className="dial-tag">{tag}</span>
        </div>
      </div>
      <div className="dial-legend">
        {legend.map((row) => (
          <div className="leg" key={row.label}>
            <span className="lk">
              <i style={{ background: row.swatch }} />
              {row.label}
            </span>
            <span className="lv">
              {row.value}
              <small style={{ opacity: 0.5, fontSize: '12px' }}>/{row.max}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
