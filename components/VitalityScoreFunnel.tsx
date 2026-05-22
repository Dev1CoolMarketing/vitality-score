'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

import InfoDialog from '@/components/InfoDialog';
import MetricCard from '@/components/MetricCard';
import { submitVitalityLead, type LeadSubmissionResponse } from '@/lib/api';
import {
  buildEmptyScores,
  categories,
  metrics,
  summarizeScores,
  type MetricDefinition,
  type MetricKey,
  type ScoreMap,
} from '@/lib/vitality-model';

type FunnelStage = 'landing' | 'assessment' | 'capture' | 'result';

export default function VitalityScoreFunnel() {
  const [stage, setStage] = useState<FunnelStage>('landing');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scores, setScores] = useState<ScoreMap>(buildEmptyScores);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadSubmissionResponse | null>(null);
  const [activeMetric, setActiveMetric] = useState<MetricDefinition | null>(
    null,
  );

  const summary = useMemo(() => summarizeScores(scores), [scores]);
  const category = categories[categoryIndex];
  const isLastCategory = categoryIndex === categories.length - 1;
  const allCategoryScoresSet = category.metricOrder.every(
    (metricId) => scores[metricId] !== null,
  );

  const handleMetricChange = (metricId: MetricKey, value: number) => {
    setScores((current) => ({ ...current, [metricId]: value }));
    setError(null);
  };

  const handleStart = () => {
    setStage('assessment');
    setCategoryIndex(0);
    setError(null);
  };

  const handleContinue = () => {
    if (!allCategoryScoresSet) {
      setError('Score every slider on this screen before continuing.');
      return;
    }
    setError(null);
    if (isLastCategory) {
      setStage('capture');
      return;
    }
    setCategoryIndex((current) => current + 1);
  };

  const handleBack = () => {
    if (stage === 'capture') {
      setStage('assessment');
      setCategoryIndex(categories.length - 1);
      setError(null);
      return;
    }
    if (categoryIndex === 0) {
      setStage('landing');
      setError(null);
      return;
    }
    setCategoryIndex((current) => current - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!summary.isComplete) {
      setError('Finish scoring all 10 sliders before requesting your result.');
      return;
    }
    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }
    if (!consent) {
      setError('Please confirm consent before submitting your score.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await submitVitalityLead(email.trim(), scores, {
        consent: true,
      });
      setResult(response);
      setStage('result');
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to save your score right now.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      {stage === 'landing' ? (
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="stage-eyebrow">T-Shots vitality assessment</p>
            <h1>Vitality Score™</h1>
            <p className="hero-body">
              Learn about your Vitality Score with a guided vitality quiz across
              sexual health, mental vitality, and physical recovery. It uses the
              same vitality rubric language as T-Shots and builds a score out of
              100.
            </p>
            <button
              className="primary-button hero-button"
              onClick={handleStart}
              type="button"
            >
              Get your score
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      ) : null}

      {stage === 'assessment' ? (
        <section className="center-stage">
          <div className="quiz-card">
            <div className="quiz-header">
              <p className="stage-eyebrow">
                Step {categoryIndex + 1} of {categories.length}
              </p>
              <h2>{category.label}</h2>
              <p className="quiz-body">
                Rate each slider from 0 to 10. This section has{' '}
                {category.metricOrder.length} question
                {category.metricOrder.length === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="quiz-metric-stack">
              {category.metricOrder.map((metricId) => (
                <MetricCard
                  accentColor={category.accentColor}
                  accentTint={category.accentTint}
                  descriptor={metrics[metricId]}
                  key={metricId}
                  onChange={(value) => handleMetricChange(metricId, value)}
                  onOpenInfo={() => setActiveMetric(metrics[metricId])}
                  value={scores[metricId]}
                />
              ))}
            </div>

            <div className="quiz-footer">
              <button
                className="secondary-button"
                onClick={handleBack}
                type="button"
              >
                Back
              </button>
              <div className="quiz-footer-actions">
                {error ? <p className="error-text">{error}</p> : null}
                <button
                  className="primary-button"
                  onClick={handleContinue}
                  type="button"
                >
                  {isLastCategory ? 'Continue' : 'Next'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {stage === 'capture' ? (
        <section className="center-stage">
          <div className="stage-card capture-card">
            <div className="capture-content">
              <p className="stage-eyebrow">Final step</p>
              <h2>Want to know your Vitality Score?</h2>
              <p className="stage-body">
                Enter your email and we&apos;ll send your Vitality Score plus
                your slider answers, then save it so T-Shots can link it if you
                later create a brand-new account with this same address.
              </p>

              <label className="email-field">
                <span>Email address</span>
                <div className="email-input-shell">
                  <Mail size={18} />
                  <input
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                  />
                </div>
              </label>

              <label className="consent-field">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    if (event.target.checked) setError(null);
                  }}
                />
                <span>
                  I consent to T-Shots collecting my Vitality Score quiz
                  answers and email address to generate and email me a
                  personalized result, and to save it so it can be linked if I
                  later create a T-Shots account with this same email. I can
                  withdraw consent and request deletion at any time. See the{' '}
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    Consumer Health Data Privacy Notice
                  </a>{' '}
                  and{' '}
                  <a href="/terms" target="_blank" rel="noreferrer">
                    Terms of Use
                  </a>
                  .
                </span>
              </label>

              {error ? <p className="error-text">{error}</p> : null}

              <div className="quiz-footer">
                <button
                  className="secondary-button"
                  onClick={handleBack}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="primary-button"
                  disabled={submitting || !consent}
                  onClick={handleSubmit}
                  type="button"
                >
                  {submitting ? 'Saving...' : 'Email my score'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {stage === 'result' && result ? (
        <section className="center-stage">
          <div className="stage-card result-card">
            <p className="stage-eyebrow">Score saved</p>
            <h2>Your Vitality Score</h2>
            <div className="result-score" style={{ color: result.band.color }}>
              {result.totalScore}
            </div>
            <p className="result-band">
              {result.band.label}
              <span>{result.band.rangeLabel}</span>
            </p>
            <p className="stage-body">
              This result has been saved and emailed to{' '}
              <strong>{result.email}</strong>. If this same email is used to
              create a brand-new T-Shots account, Rayhawk can attach this
              pre-signup score during onboarding.
            </p>

            <div className="result-actions">
              <button
                className="secondary-button"
                onClick={() => {
                  setScores(buildEmptyScores());
                  setEmail('');
                  setConsent(false);
                  setResult(null);
                  setStage('landing');
                  setCategoryIndex(0);
                  setError(null);
                }}
                type="button"
              >
                Start over
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <InfoDialog metric={activeMetric} onClose={() => setActiveMetric(null)} />

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} T-Shots</span>
        <a href="/privacy">Privacy &amp; Consumer Health Data Notice</a>
        <a href="/terms">Terms of Use</a>
      </footer>
    </main>
  );
}
