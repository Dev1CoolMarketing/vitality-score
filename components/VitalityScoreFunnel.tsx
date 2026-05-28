'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, Mail, X } from 'lucide-react';

import InfoDialog from '@/components/InfoDialog';
import MetricCard from '@/components/MetricCard';
import PhoneShowcase from '@/components/PhoneShowcase';
import ScoreDial from '@/components/ScoreDial';
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
type Sex = 'male' | 'female';

const MARKERS: Record<Sex, { sex: string[]; mental: string[]; phys: string[] }> = {
  male: {
    sex: [
      'Erection Strength',
      'Morning Erections',
      'Libido & Sex Drive',
      'Spontaneous Sexual Thoughts',
    ],
    mental: [
      'Mental Energy & Motivation',
      'Concentration & Mental Sharpness',
      'Mood',
    ],
    phys: [
      'Strength & Stamina',
      'Physique Composition',
      'Restorative Sleep',
    ],
  },
  female: {
    sex: ['Arousal & Lubrication', 'Orgasmic Function', 'Libido & Sex Drive'],
    mental: [
      'Mental Energy & Motivation',
      'Concentration & Mental Sharpness',
      'Mood',
    ],
    phys: [
      'Strength & Stamina',
      'Physique Composition',
      'Skin & Hair Health',
      'Restorative Sleep',
    ],
  },
};

const SEX_LABEL: Record<Sex, string> = {
  male: 'Masculine Vitality Score™',
  female: 'Feminine Vitality Score™',
};

const renderMarkerLi = (items: string[], startIndex: number) =>
  items.map((name, idx) => {
    const n = String(startIndex + idx + 1).padStart(2, '0');
    return (
      <li key={name}>
        <i>{n}</i> {name}
      </li>
    );
  });

export default function VitalityScoreFunnel() {
  const supportEmail = 'support@t-shots.com';
  const [stage, setStage] = useState<FunnelStage>('landing');
  const [sex, setSex] = useState<Sex>('male');
  const [catsSwapping, setCatsSwapping] = useState(false);
  const revealRoot = useRef<HTMLElement | null>(null);
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

  const handleSetSex = (next: Sex) => {
    if (next === sex) return;
    setCatsSwapping(true);
    window.setTimeout(() => {
      setSex(next);
      setCatsSwapping(false);
    }, 300);
  };

  useEffect(() => {
    if (stage !== 'landing') return;
    const root = revealRoot.current;
    if (!root) return;
    const heroReveals = root.querySelectorAll<HTMLElement>('.hero .reveal');
    heroReveals.forEach((el) => el.classList.add('in'));
    const targets = root.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stage]);

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
    <main className="page-shell" ref={revealRoot}>
      <nav aria-label="Primary">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <b>
              Vitality Score<span className="tm">&trade;</span>
            </b>
          </a>
          {stage === 'landing' ? (
            <div className="nav-links">
              <a href="#why">Why it&apos;s different</a>
              <a href="#composite">What&apos;s measured</a>
              <a href="#clinical">For clinicians</a>
              <button
                className="btn nav-cta"
                onClick={handleStart}
                type="button"
              >
                Get your score
              </button>
            </div>
          ) : null}
        </div>
      </nav>

      {stage === 'landing' ? (
        <>
          <header className="hero" id="top">
            <div className="hero-bg">
              <div className="glow g1" />
              <div className="glow g2" />
              <div className="hero-grid-lines" />
            </div>
            <div className="wrap hero-in">
              <div className="hero-copy">
                <span
                  className="eyebrow reveal"
                  style={{ '--d': '.05s' } as React.CSSProperties}
                >
                  A T-SHOTS&trade; Self-Assessment
                </span>
                <h1
                  className="display reveal"
                  style={{ '--d': '.12s' } as React.CSSProperties}
                >
                  Put a number
                  <br />
                  on your <em>vitality.</em>
                </h1>
                <p
                  className="sub reveal"
                  style={{ '--d': '.2s' } as React.CSSProperties}
                >
                  Vitality Score&trade; turns ten evidence-based signals across
                  your sexual, mental, and physical health into one clear score
                  — measured, recorded, and tracked over time.
                </p>
                <div
                  className="hero-cta reveal"
                  style={{ '--d': '.28s' } as React.CSSProperties}
                >
                  <button
                    className="btn"
                    onClick={handleStart}
                    type="button"
                  >
                    Get your Vitality Score <span className="arr">→</span>
                  </button>
                  <a className="btn btn-ghost" href="#composite">
                    See what&apos;s measured
                  </a>
                </div>
                <div
                  className="reassure reveal"
                  style={{ '--d': '.36s' } as React.CSSProperties}
                >
                  <span>Completely free</span>
                  <span className="dot" />
                  <span>No real name</span>
                  <span className="dot" />
                  <span>No payment</span>
                  <span className="dot" />
                  <span>About 3 minutes</span>
                </div>
              </div>
              <div
                className="reveal"
                style={{ '--d': '.3s' } as React.CSSProperties}
              >
                <ScoreDial
                  legend={[
                    { label: 'Sexual', value: 29, max: 40, swatch: 'var(--green-bright)' },
                    { label: 'Mental', value: 25, max: 30, swatch: 'var(--green-mid)' },
                    { label: 'Physical', value: 28, max: 30, swatch: 'var(--sage)' },
                  ]}
                  tag="Strong vitality"
                  value={82}
                />
              </div>
            </div>
          </header>

          <section className="band-paper" id="why">
            <div className="wrap sec">
              <div className="sec-head reveal">
                <span className="eyebrow">Why Vitality Score</span>
                <h2 className="display">
                  Not another online quiz.
                  <br />A real measurement.
                </h2>
                <p>
                  Most &ldquo;wellness checks&rdquo; ask a single vague question
                  and hand you a label. Vitality Score is built like a clinical
                  instrument — composite, evidence-based, sex-specific, and
                  designed to be tracked.
                </p>
              </div>
              <div className="why-grid reveal">
                <div className="why">
                  <span className="n">01 — Composite</span>
                  <h3>One score from ten signals</h3>
                  <p>
                    A single question can&apos;t capture vitality. Vitality
                    Score combines ten distinct measurements into one number,
                    so no single off day distorts the picture.
                  </p>
                </div>
                <div className="why">
                  <span className="n">02 — Evidence-based</span>
                  <h3>Markers that actually matter</h3>
                  <p>
                    Each component was selected from peer-reviewed research as
                    a genuine signal of vitality — not a personality trait or a
                    marketing gimmick.
                  </p>
                </div>
                <div className="why">
                  <span className="n">03 — Sex-specific</span>
                  <h3>Built for you, specifically</h3>
                  <p>
                    Men and women take separate, purpose-built assessments.
                    You&apos;re scored against what vitality means for your
                    biology — never a one-size-fits-all average.
                  </p>
                </div>
                <div className="why">
                  <span className="n">04 — Trackable</span>
                  <h3>A baseline you can revisit</h3>
                  <p>
                    Your score is recorded so you can watch it move. Lifestyle
                    changes, treatment, and time all show up as a trend you can
                    actually see.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="band-ink" id="composite">
            <div className="wrap sec">
              <div className="sec-head reveal">
                <span className="eyebrow">What&apos;s measured</span>
                <h2 className="display">
                  Ten markers. Three categories.
                  <br />
                  One Vitality Score.
                </h2>
                <p>
                  Your score is tabulated from ten self-assessments established
                  as the most relevant signals of vitality. They span the three
                  domains where vitality is felt first.
                </p>
                <div
                  className="measure-toggle"
                  role="tablist"
                  aria-label="Choose assessment by sex"
                  style={{ marginTop: '30px' }}
                >
                  <button
                    aria-selected={sex === 'male'}
                    className={sex === 'male' ? 'active' : ''}
                    onClick={() => handleSetSex('male')}
                    role="tab"
                    type="button"
                  >
                    <span className="sym" aria-hidden>
                      ♂
                    </span>{' '}
                    Male
                  </button>
                  <button
                    aria-selected={sex === 'female'}
                    className={sex === 'female' ? 'active' : ''}
                    onClick={() => handleSetSex('female')}
                    role="tab"
                    type="button"
                  >
                    <span className="sym" aria-hidden>
                      ♀
                    </span>{' '}
                    Female
                  </button>
                </div>
                <p className="measure-caption" aria-live="polite">
                  Showing the <b>{SEX_LABEL[sex]}</b> markers
                </p>
              </div>
              <div
                aria-label="Vitality markers"
                className={`cats${catsSwapping ? ' swapping' : ''}`}
                role="tabpanel"
              >
                <div className="cat cat-sex reveal">
                  <div className="ctop">
                    <h3>Sexual Vitality</h3>
                    <span className="cnt">{MARKERS[sex].sex.length} markers</span>
                  </div>
                  <div className="cdesc">
                    The earliest and most sensitive signals of changing hormonal
                    vitality.
                  </div>
                  <ul>{renderMarkerLi(MARKERS[sex].sex, 0)}</ul>
                </div>
                <div className="cat cat-men reveal">
                  <div className="ctop">
                    <h3>Mental Vitality</h3>
                    <span className="cnt">
                      {MARKERS[sex].mental.length} markers
                    </span>
                  </div>
                  <div className="cdesc">
                    How vitality shows up in drive, clarity, and emotional
                    steadiness.
                  </div>
                  <ul>
                    {renderMarkerLi(MARKERS[sex].mental, MARKERS[sex].sex.length)}
                  </ul>
                </div>
                <div className="cat cat-phys reveal">
                  <div className="ctop">
                    <h3>Physical Vitality</h3>
                    <span className="cnt">{MARKERS[sex].phys.length} markers</span>
                  </div>
                  <div className="cdesc">
                    The visible, physical state that tracks underlying metabolic
                    function.
                  </div>
                  <ul>
                    {renderMarkerLi(
                      MARKERS[sex].phys,
                      MARKERS[sex].sex.length + MARKERS[sex].mental.length,
                    )}
                  </ul>
                </div>
              </div>
              <p className="composite-note reveal">
                Each marker is rated 0–10 &nbsp;·&nbsp; combined into one
                composite <b>Vitality Score out of 100</b>
              </p>
            </div>
          </section>

          <section className="band-paper">
            <div className="wrap sec">
              <div className="sec-head reveal">
                <span className="eyebrow">Two distinct assessments</span>
                <h2 className="display">
                  Vitality isn&apos;t unisex.
                  <br />
                  Neither is your score.
                </h2>
                <p>
                  Because the markers of vitality differ by biology, there are
                  two separate, purpose-built instruments. Choose the one made
                  for you.
                </p>
              </div>
              <div className="mw reveal">
                <div className="mw-card mw-m">
                  <span className="badge">For Men</span>
                  <h3>Masculine Vitality Score&trade;</h3>
                  <p>
                    Calibrated to the signals most relevant to men — from sexual
                    and physical markers to the mental shifts tied to
                    testosterone and male hormonal health.
                  </p>
                  <button className="go" onClick={handleStart} type="button">
                    Start the men&apos;s assessment →
                  </button>
                </div>
                <div className="mw-card mw-w">
                  <span className="badge">For Women</span>
                  <h3>Feminine Vitality Score&trade;</h3>
                  <p>
                    A separate instrument built around the markers most relevant
                    to women&apos;s vitality — scored against what wellness
                    looks like for female physiology.
                  </p>
                  <button className="go" onClick={handleStart} type="button">
                    Start the women&apos;s assessment →
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            className="band-paper"
            id="clinical"
            style={{ background: 'var(--paper-2)' }}
          >
            <div className="wrap sec">
              <div className="clin">
                <div className="reveal">
                  <span className="eyebrow">For you and your clinician</span>
                  <h2
                    className="display"
                    style={{
                      fontSize: 'clamp(30px, 4vw, 46px)',
                      margin: '18px 0 18px',
                    }}
                  >
                    A score your doctor
                    <br />
                    can actually use.
                  </h2>
                  <p className="muted" style={{ fontSize: '19.5px' }}>
                    Your Vitality Score isn&apos;t just for you. Shared with a
                    qualified healthcare provider, it becomes structured
                    evidence — helping support a diagnosis of testosterone
                    deficiency and guiding the clinician toward the right course
                    of action.
                  </p>
                </div>
                <div className="clin-panel reveal">
                  <div className="clin-row">
                    <span className="k">→</span>
                    <div className="t">
                      <b>Brings structure to the conversation</b>
                      <span>
                        Replaces &ldquo;I just don&apos;t feel like
                        myself&rdquo; with ten quantified, trackable markers.
                      </span>
                    </div>
                  </div>
                  <div className="clin-row">
                    <span className="k">→</span>
                    <div className="t">
                      <b>Supports a clinical diagnosis</b>
                      <span>
                        A low, cross-domain pattern can support a provider&apos;s
                        assessment of low serum testosterone.
                      </span>
                    </div>
                  </div>
                  <div className="clin-row">
                    <span className="k">→</span>
                    <div className="t">
                      <b>Guides the course of action</b>
                      <span>
                        Gives the clinician a clear baseline to weigh further
                        testing and treatment options against.
                      </span>
                    </div>
                  </div>
                  <p className="clin-disclaimer">
                    Vitality Score is a self-assessment tool intended to support
                    — <b>not replace</b> — professional medical evaluation.
                    Diagnosis and treatment decisions rest solely with a
                    qualified healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="band-ink" id="start">
            <div className="wrap sec">
              <div className="sec-head reveal">
                <span className="eyebrow">Getting started</span>
                <h2 className="display">
                  Free to measure.
                  <br />
                  Yours to track.
                </h2>
                <p>
                  Measuring your Vitality Score is a completely free service.
                  No real name. No payment information. Just enough to save
                  your score and follow it over time.
                </p>
              </div>
              <div className="steps">
                <div className="step reveal">
                  <span className="sn">1</span>
                  <h3>Take the self-assessment</h3>
                  <p>
                    Answer the ten markers for your sex. It takes about three
                    minutes — and there are no wrong answers.
                  </p>
                </div>
                <div className="step reveal">
                  <span className="sn">2</span>
                  <h3>Get your first score</h3>
                  <p>
                    Receive your composite Vitality Score out of 100, broken
                    down across all three categories.
                  </p>
                </div>
                <div className="step reveal">
                  <span className="sn">3</span>
                  <h3>Track it in T-SHOTS&trade;</h3>
                  <p>
                    Access the free T-SHOTS&trade; app to review your baseline
                    and watch your score change over time.
                  </p>
                </div>
              </div>
              <div className="free-strip reveal">
                <div className="fl">
                  <h3>All we ever ask for</h3>
                  <p>
                    No real name. No card. No catch. Create your private account
                    with three simple details and get instant access to the free
                    T-SHOTS&trade; app.
                  </p>
                  <div className="chips">
                    <span className="chip">✓ Email address</span>
                    <span className="chip">✓ Year of birth</span>
                    <span className="chip">✓ A nickname</span>
                  </div>
                </div>
                <button className="btn" onClick={handleStart} type="button">
                  Start free now <span className="arr">→</span>
                </button>
              </div>
              <p className="start-note reveal">
                <b>Please note:</b> Vitality Score is a self-assessment for
                informational purposes only and is not medical advice or a
                diagnosis. It does not replace care from a qualified healthcare
                professional.
              </p>
            </div>
          </section>

          <section className="band-paper">
            <div className="wrap sec">
              <div className="cred reveal">
                <span className="eyebrow">Built on research</span>
                <h2>
                  Developed through a generous grant from T-SHOTS&trade; and The
                  Sex Institute&trade; — and grounded in peer-reviewed science.
                </h2>
                <div className="funders">
                  <div className="funder">
                    <b>T-SHOTS&trade;</b>
                    <span>Funding Partner</span>
                  </div>
                  <div className="funder">
                    <b>The Sex Institute&trade;</b>
                    <span>Funding Partner</span>
                  </div>
                </div>
                <p className="cred-author">
                  Created by Raihan Haque M.D. &nbsp;·&nbsp; A COOL INC.
                  instrument
                </p>
              </div>
            </div>
          </section>

          <section className="final band-ink">
            <div className="glow" />
            <div className="wrap final-in reveal">
              <span className="eyebrow">A T-SHOTS&trade; Self-Assessment</span>
              <h2 className="display">What&apos;s your number?</h2>
              <p>
                Find out in three minutes. It&apos;s free, private, and the
                first step toward tracking the vitality that matters most.
              </p>
              <button
                className="btn"
                onClick={handleStart}
                style={{ padding: '19px 38px', fontSize: '17px' }}
                type="button"
              >
                Get your Vitality Score <span className="arr">→</span>
              </button>
            </div>
          </section>

        </>
      ) : null}

      {stage === 'assessment' ? (
        <section className="quiz-shell">
          <div className="quiz-shell-inner">
          <div
            className="quiz-card fade-up-panel"
            key={`assessment-${category.id}-${categoryIndex}`}
          >
            <div className="quiz-header">
              <p className="stage-eyebrow">
                Step {categoryIndex + 1} of {categories.length}
              </p>
              <h2>{category.label}</h2>
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
          </div>
        </section>
      ) : null}

      {stage === 'capture' ? (
        <section className="quiz-shell">
          <div className="quiz-shell-inner">
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
          </div>
        </section>
      ) : null}

      {stage === 'result' && result ? (
        <section className="quiz-shell">
          <div className="quiz-shell-inner">
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
          </div>
        </section>
      ) : null}

      <InfoDialog metric={activeMetric} onClose={() => setActiveMetric(null)} />

      {error ? (
        <div
          aria-modal="true"
          className="dialog-backdrop dialog-backdrop-visible"
          onClick={() => setError(null)}
          role="dialog"
        >
          <div
            className="error-modal fade-up-panel fade-up-panel-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="error-modal-header">
              <span className="error-modal-icon" aria-hidden>
                <AlertCircle size={22} />
              </span>
              <button
                aria-label="Dismiss"
                className="ghost-button error-modal-close"
                onClick={() => setError(null)}
                type="button"
              >
                <X size={18} />
              </button>
            </div>
            <h2 className="error-modal-title">Something needs your attention</h2>
            <p className="error-modal-body">{error}</p>
            <div className="error-modal-actions">
              <button
                className="primary-button"
                onClick={() => setError(null)}
                type="button"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="band-ink">
        <div className="wrap">
          <div className="foot-top">
            <div className="brand">
              <b
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontWeight: 600,
                  fontSize: '22px',
                }}
              >
                Vitality Score&trade;
              </b>
              <span
                style={{
                  fontFamily: '"Noto Sans Mono", monospace',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--light-dim)',
                  marginTop: '6px',
                }}
              >
                A T-SHOTS&trade; Self-Assessment
              </span>
            </div>
            <div className="foot-links">
              <div className="foot-col">
                <h4>Assess</h4>
                <a onClick={handleStart} role="button" tabIndex={0}>
                  Masculine Vitality Score&trade;
                </a>
                <a onClick={handleStart} role="button" tabIndex={0}>
                  Feminine Vitality Score&trade;
                </a>
                <a href="#composite">What&apos;s measured</a>
              </div>
              <div className="foot-col">
                <h4>Learn</h4>
                <a href="#why">Why it&apos;s different</a>
                <a href="#clinical">For clinicians</a>
                <a href="/privacy">Privacy &amp; Consumer Health Data</a>
                <a href="/terms">Terms of Use</a>
              </div>
              <div className="foot-col">
                <h4>T-SHOTS&trade;</h4>
                <a href="https://t-shots.com">Get the app</a>
                <a href="https://t-shots.com">T-SHOTS.com</a>
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </div>
            </div>
          </div>
          <div className="disclaimer">
            <div className="dh">⚕ Medical Disclaimer</div>
            <p>
              Vitality Score&trade; is a self-assessment tool provided for
              informational and educational purposes only. This tool does not
              provide a diagnosis, treatment, or medical advice.{' '}
              <b>
                Vitality Score&trade; is not a substitute for consulting with,
                and/or receiving care from, a qualified healthcare professional
                or clinician.
              </b>{' '}
              Always seek the advice of your physician or another qualified
              provider with any questions you may have regarding a medical
              condition, and never disregard or delay professional medical
              advice because of anything provided by this tool.
            </p>
          </div>
          <div className="foot-bottom">
            <span className="mono">
              © 2020&ndash;{new Date().getFullYear()} COOL INC. All rights
              reserved.
            </span>
            <span className="mono">
              Vitality Score&trade; &nbsp;·&nbsp; T-SHOTS&trade; &nbsp;·&nbsp;
              The Sex Institute&trade;
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
