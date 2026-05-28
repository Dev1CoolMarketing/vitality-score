'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Info } from 'lucide-react';

import {
  getDescriptorText,
  type MetricDefinition,
} from '@/lib/vitality-model';
import { getStableRoundedSliderValue } from '@/lib/discrete-slider';

type MetricCardProps = {
  accentColor: string;
  accentTint: string;
  descriptor: MetricDefinition;
  onChange: (value: number) => void;
  onOpenInfo: () => void;
  value: number | null;
};

export default function MetricCard({
  accentColor,
  accentTint,
  descriptor,
  onChange,
  onOpenInfo,
  value,
}: MetricCardProps) {
  const [rawValue, setRawValue] = useState<number | null>(null);
  const [displayInteger, setDisplayInteger] = useState<number | null>(value);
  const isDraggingRef = useRef(false);
  const roundedValueRef = useRef(value ?? 0);
  const resolvedValue = value ?? 0;
  const activeRawValue = rawValue ?? resolvedValue;
  const roundedActiveValue = displayInteger ?? value ?? 0;
  const ratio = activeRawValue / 10;
  const colorBaseValue =
    value === null && displayInteger === null ? 0 : roundedActiveValue;
  const fillColor =
    value === null && displayInteger === null
      ? '#CBD5E1'
      : toScoreColor(colorBaseValue, 0, 10);
  const descriptorValue =
    value === null && displayInteger === null ? null : roundedActiveValue;
  const descriptorText = getDescriptorText(descriptor, descriptorValue);
  const descriptorToneColor = getDescriptorToneColor(roundedActiveValue);
  const sliderStyle = {
    '--slider-percent': `${ratio * 100}%`,
    '--slider-fill': fillColor,
  } as CSSProperties;

  useEffect(() => {
    if (isDraggingRef.current) return;
    roundedValueRef.current = value ?? 0;
    setDisplayInteger(value);
  }, [value]);

  const handleSliderChange = (raw: number) => {
    isDraggingRef.current = true;
    setRawValue(raw);
    const rounded = getStableRoundedSliderValue({
      rawValue: raw,
      lastRoundedValue: roundedValueRef.current,
      min: 0,
      max: 10,
    });
    if (rounded !== roundedValueRef.current) {
      roundedValueRef.current = rounded;
      setDisplayInteger(rounded);
      onChange(rounded);
    }
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setRawValue(null);
  };

  return (
    <article className="metric-card">
      <div className="metric-card-header">
        <div className="metric-card-label-row">
          <p className="metric-label">{descriptor.label}</p>
          <button
            aria-label={`About ${descriptor.label}`}
            className="metric-info-button"
            onClick={onOpenInfo}
            type="button"
          >
            <Info size={16} />
          </button>
        </div>
        <span
          className="metric-value-pill"
          style={{
            color: value === null ? '#64748B' : accentColor,
            backgroundColor: value === null ? '#F8FAFC' : accentTint,
          }}
        >
          {value === null && displayInteger === null
            ? 'Not set'
            : `${roundedActiveValue}/10`}
        </span>
      </div>

      <div className="metric-slider-block">
        <div className="metric-slider-shell" style={sliderStyle}>
          <div aria-hidden className="metric-slider-visual">
            <div className="metric-slider-fill" />
          </div>
          <input
            aria-label={descriptor.label}
            className="metric-slider-input"
            max={10}
            min={0}
            step="any"
            onChange={(event) => handleSliderChange(Number(event.target.value))}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onTouchEnd={endDrag}
            onMouseUp={endDrag}
            onBlur={endDrag}
            onKeyUp={endDrag}
            type="range"
            value={activeRawValue}
          />
        </div>
        <div className="metric-slider-scale">
          <span>0</span>
          <span>10</span>
        </div>
      </div>

      <div className="metric-descriptor">
        {renderDescriptorText(descriptorText, descriptorToneColor)}
      </div>
    </article>
  );
}

const toScoreColor = (value: number, min: number, max: number) => {
  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / Math.max(1, max - min);
  const start = { r: 239, g: 68, b: 68 };
  const mid = { r: 250, g: 204, b: 21 };
  const end = { r: 34, g: 197, b: 94 };
  const mix = (from: number, to: number, t: number) =>
    Math.round(from + (to - from) * t);
  const segment = ratio <= 0.5 ? 'low' : 'high';
  const localRatio = ratio <= 0.5 ? ratio / 0.5 : (ratio - 0.5) / 0.5;
  const from = segment === 'low' ? start : mid;
  const to = segment === 'low' ? mid : end;
  return `#${[
    mix(from.r, to.r, localRatio),
    mix(from.g, to.g, localRatio),
    mix(from.b, to.b, localRatio),
  ]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
};

const getDescriptorToneColor = (score: number) => {
  if (score <= 3) return '#B91C1C';
  if (score <= 6) return '#9A3412';
  return '#166534';
};

const BRACKET_PATTERN = /(\[[^\]]+\])/g;

const renderDescriptorText = (text: string, toneColor: string): ReactNode =>
  text.split('\n').map((line, lineIndex) => {
    const segments = line
      .split(BRACKET_PATTERN)
      .filter(Boolean)
      .map((segment) => ({
        bracketed: /^\[[^\]]+\]$/.test(segment),
        value: segment,
      }));

    return (
      <span className="metric-descriptor-line" key={`${line}-${lineIndex}`}>
        {segments.map((segment, segmentIndex) => (
          <span
            className={
              segment.bracketed ? 'metric-descriptor-bracket' : undefined
            }
            key={`${segment.value}-${segmentIndex}`}
            style={segment.bracketed ? { color: toneColor } : undefined}
          >
            {segment.value}
          </span>
        ))}
      </span>
    );
  });
