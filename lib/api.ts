import type { ScoreMap } from '@/lib/vitality-model';

export type LeadSubmissionResponse = {
  id: string;
  email: string;
  totalScore: number;
  completedMetricCount: number;
  band: {
    rangeLabel: string;
    label: string;
    color: string;
  };
  createdAt: string;
};

export type SubmitVitalityLeadOptions = {
  consent: boolean;
  consentVersion?: string;
};

const CONSENT_VERSION = 'v1';

const resolveBaseUrl = () =>
  normalizeApiBaseUrl(process.env.NEXT_PUBLIC_RAYHAWK_API_URL) ||
  'http://localhost:8080/v1';

const normalizeApiBaseUrl = (value: string | undefined) => {
  if (!value) {
    return '';
  }

  const trimmed = value.replace(/\/$/, '');
  return trimmed.endsWith('/v1') ? trimmed : `${trimmed}/v1`;
};

export async function submitVitalityLead(
  email: string,
  scores: ScoreMap,
  options: SubmitVitalityLeadOptions,
): Promise<LeadSubmissionResponse> {
  const payload = {
    email,
    consent: options.consent,
    consentVersion: options.consentVersion ?? CONSENT_VERSION,
    erectionStrength: scores.erectionStrength,
    morningErections: scores.morningErections,
    libido: scores.libido,
    sexualThoughts: scores.sexualThoughts,
    energyLevels: scores.energyLevels,
    moodStability: scores.moodStability,
    strengthEndurance: scores.strengthEndurance,
    concentrationSharpness: scores.concentrationSharpness,
    bodyComposition: scores.bodyComposition,
    sleepQuality: scores.sleepQuality,
    source: 'vitality-score',
  };

  const response = await fetch(`${resolveBaseUrl()}/vitality-score-leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { message?: string | string[] }
      | null;
    const message = Array.isArray(data?.message)
      ? data?.message[0]
      : data?.message;
    throw new Error(message || 'Unable to save your Vitality Score right now.');
  }

  return response.json();
}
