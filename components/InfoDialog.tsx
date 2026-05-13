'use client';

import type { MetricDefinition } from '@/lib/vitality-model';

type InfoDialogProps = {
  metric: MetricDefinition | null;
  onClose: () => void;
};

export default function InfoDialog({ metric, onClose }: InfoDialogProps) {
  if (!metric) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose} role="presentation">
      <div
        aria-labelledby="metric-dialog-title"
        aria-modal="true"
        className="dialog-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="dialog-header">
          <div>
            <p className="dialog-eyebrow">Metric guide</p>
            <h2 id="metric-dialog-title">{metric.label}</h2>
          </div>
          <button className="ghost-button" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="dialog-scroll">
          <p className="dialog-definition">{metric.definition}</p>

          {metric.distinctionNote ? (
            <section className="dialog-note">
              <h3>{metric.distinctionNote.title}</h3>
              <p>{metric.distinctionNote.description}</p>
              <p className="dialog-prompt">{metric.distinctionNote.prompt}</p>
              <ul>
                {metric.distinctionNote.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="dialog-takeaway">{metric.distinctionNote.keyTakeaway}</p>
            </section>
          ) : null}

          <div className="dialog-scale-grid">
            <article className="dialog-scale-card">
              <span className="dialog-scale-label">0 / 10</span>
              <h3>{metric.low.anchor}</h3>
              <p>{metric.low.detail}</p>
            </article>
            <article className="dialog-scale-card">
              <span className="dialog-scale-label">10 / 10</span>
              <h3>{metric.high.anchor}</h3>
              <p>{metric.high.detail}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
