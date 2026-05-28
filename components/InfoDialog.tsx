'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import type { MetricDefinition } from '@/lib/vitality-model';

type InfoDialogProps = {
  metric: MetricDefinition | null;
  onClose: () => void;
};

const MARKDOWN_BOLD_PATTERN = /(\*\*[^*]+\*\*|__[^_]+__)/;
const BRACKET_PATTERN = /(\[[^\]]+\])/g;

const getMarkdownBoldSegments = (
  text: string,
): { bold: boolean; text: string }[] =>
  text
    .split(MARKDOWN_BOLD_PATTERN)
    .map((segment) => {
      if (/^\*\*[^*]+\*\*$/.test(segment)) {
        return { bold: true, text: segment.slice(2, -2) };
      }
      if (/^__[^_]+__$/.test(segment)) {
        return { bold: true, text: segment.slice(2, -2) };
      }
      return { bold: false, text: segment };
    })
    .filter((segment) => segment.text.length > 0);

const renderFormattedText = (text: string): ReactNode =>
  getMarkdownBoldSegments(text).map((segment, index) =>
    segment.bold ? (
      <strong key={`${segment.text}-${index}`}>{segment.text}</strong>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    ),
  );

const getDescriptorToneColor = (score: number) => {
  if (score <= 3) return '#B91C1C';
  if (score <= 6) return '#9A3412';
  return '#166534';
};

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

export default function InfoDialog({ metric, onClose }: InfoDialogProps) {
  if (!metric) return null;

  const supplementalSections = Array.isArray(metric.supplementalSections)
    ? metric.supplementalSections
    : [];

  return (
    <div
      className="dialog-backdrop dialog-backdrop-visible"
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-labelledby="metric-dialog-title"
        aria-modal="true"
        className="dialog-panel fade-up-panel fade-up-panel-dialog"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="dialog-header">
          <div>
            <p className="dialog-eyebrow">Metric guide</p>
            <h2 id="metric-dialog-title">{metric.label}</h2>
          </div>
          <button
            aria-label="Close dialog"
            className="ghost-button dialog-close-button"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="dialog-scroll">
          <p className="dialog-definition">{metric.definition}</p>

          {supplementalSections.map((section) => (
            <section className="dialog-note" key={section.title}>
              <h3>{section.title}</h3>
              {(section.paragraphs ?? []).map((paragraph, index) => (
                <p key={`${section.title}-paragraph-${index}`}>
                  {renderFormattedText(paragraph)}
                </p>
              ))}
              {(section.bullets ?? []).length ? (
                <ul>
                  {(section.bullets ?? []).map((bullet, index) => (
                    <li key={`${section.title}-bullet-${index}`}>
                      {renderFormattedText(bullet)}
                    </li>
                  ))}
                </ul>
              ) : null}
              {(section.citations ?? []).length ? (
                <ul>
                  {(section.citations ?? []).map((citation, index) => (
                    <li key={`${section.title}-citation-${index}`}>
                      {renderFormattedText(citation)}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.keyTakeaway ? (
                <p className="dialog-takeaway">
                  {renderFormattedText(section.keyTakeaway)}
                </p>
              ) : null}
            </section>
          ))}

          <div className="dialog-scale-grid">
            <article className="dialog-scale-card">
              <span className="dialog-scale-label">0 / 10</span>
              <h3>
                {renderDescriptorText(
                  metric.low.anchor,
                  getDescriptorToneColor(0),
                )}
              </h3>
              <p>{metric.low.detail}</p>
            </article>
            <article className="dialog-scale-card">
              <span className="dialog-scale-label">10 / 10</span>
              <h3>
                {renderDescriptorText(
                  metric.high.anchor,
                  getDescriptorToneColor(10),
                )}
              </h3>
              <p>{metric.high.detail}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
