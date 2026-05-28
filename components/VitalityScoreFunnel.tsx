'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

import InfoDialog from '@/components/InfoDialog';
import MetricCard from '@/components/MetricCard';
import PhoneShowcase from '@/components/PhoneShowcase';
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
  const supportEmail = 'support@t-shots.com';
  const signInHref = useMemo(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_TSHOTS_WEB_URL?.trim() || 'https://t-shots.com';
    const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
    const url = new URL('/login', `${normalizedBaseUrl}/`);
    url.searchParams.set('returnTo', '/t-log?logType=vitality');
    return url.toString();
  }, []);
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
          ? `${submissionError.message} If this continues, please contact ${supportEmail}.`
          : `Unable to save your score right now. If this continues, please contact ${supportEmail}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <div className="desktop-utility-nav">
        <a className="desktop-signin-link" href={signInHref}>
          Sign In
        </a>
      </div>

      {stage === 'landing' ? (
        <section className="hero-panel">
          <div className="hero-copy fade-up-panel" key="landing-panel">
            <div className="hero-copy-block hero-copy-block-solo">
              <h1 className="hero-title">
                <span className="hero-title-text">Vitality Score</span>
                <span className="hero-title-mark">&trade;</span>
              </h1>
              <p className="hero-body">
                Learn about your Vitality Score with a guided vitality quiz
                across sexual health, mental vitality, and physical recovery.
                It uses the same vitality rubric language as T-Shots and
                builds a score out of 100.
              </p>
              <button
                className="primary-button hero-button"
                onClick={handleStart}
                type="button"
              >
                Get Your Score
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {stage === 'assessment' ? (
        <section className="center-stage">
          <div
            className="quiz-card fade-up-panel"
            key={`assessment-${category.id}-${categoryIndex}`}
          >
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
          <div className="stage-card capture-card fade-up-panel" key="capture-panel">
            <div className="capture-layout">
              <div className="capture-content">
                <p className="stage-eyebrow">Final step</p>
                <h2>Enter your email to get the app link</h2>
                <p className="stage-body">
                  We&apos;ll send you the T-Shots app link and save this
                  Vitality Score. When you register in the app, use this same
                  email address so we can connect your score automatically.
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
                    className="primary-button"
                    disabled={submitting || !consent}
                    onClick={handleSubmit}
                    type="button"
                  >
                    {submitting ? 'Saving...' : 'Get My Score!'}
                  </button>
                </div>
              </div>

              <div className="capture-media-block">
                <div className="capture-phone-shell">
                  <PhoneShowcase
                    className="phone-showcase-capture"
                    sizes="(max-width: 720px) 210px, (max-width: 1080px) 240px, 260px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {stage === 'result' && result ? (
        <section className="center-stage">
          <div className="stage-card result-card fade-up-panel" key="result-panel">
            <p className="stage-eyebrow">
              {result.emailDelivery.success ? 'Email sent' : 'Email issue'}
            </p>
            <h2>
              {result.emailDelivery.success
                ? 'Open T-Shots to view your Vitality Score'
                : 'We saved your Vitality Score'}
            </h2>
            <p className="stage-body">
              {result.emailDelivery.success ? (
                <>
                  We sent the app link to <strong>{result.email}</strong>.
                  Register in T-Shots with this same email address to view the
                  Vitality Score you just saved.
                </>
              ) : (
                <>
                  We saved your Vitality Score, but we couldn&apos;t send the
                  app link to <strong>{result.email}</strong>. Please contact{' '}
                  <a className="support-link" href={`mailto:${supportEmail}`}>
                    {supportEmail}
                  </a>{' '}
                  and register in T-Shots with this same email address to view
                  the score you just saved.
                </>
              )}
            </p>

            <div className="result-download-block">
              <div className="result-phone-shell">
                <PhoneShowcase
                  className="phone-showcase-result"
                  sizes="(max-width: 720px) 210px, (max-width: 1080px) 220px, 240px"
                />
              </div>

              <div className="store-badge-links">
                <a
                  aria-label="App Store link coming soon"
                  className="store-badge-link"
                  href=""
                  onClick={(event) => event.preventDefault()}
                >
                  <Image
                    alt="Download on the App Store"
                    className="store-badge-image store-badge-image-apple"
                    height={60}
                    src="/images/store-badges/app-store-badge.svg"
                    width={180}
                  />
                </a>

                <a
                  aria-label="Google Play link coming soon"
                  className="store-badge-link"
                  href=""
                  onClick={(event) => event.preventDefault()}
                >
                  <Image
                    alt="Get it on Google Play"
                    className="store-badge-image store-badge-image-google"
                    height={60}
                    src="/images/store-badges/google-play-badge.png"
                    width={180}
                  />
                </a>
              </div>
            </div>

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
