export type MetricKey =
  | 'erectionStrength'
  | 'morningErections'
  | 'libido'
  | 'sexualThoughts'
  | 'energyLevels'
  | 'moodStability'
  | 'strengthEndurance'
  | 'concentrationSharpness'
  | 'bodyComposition'
  | 'sleepQuality';

export type DistinctionNote = {
  title: string;
  description: string;
  prompt: string;
  bullets: string[];
  keyTakeaway: string;
};

export type MetricDefinition = {
  id: MetricKey;
  label: string;
  definition: string;
  low: { anchor: string; detail: string };
  high: { anchor: string; detail: string };
  selectedDescriptors: string[];
  distinctionNote?: DistinctionNote;
};

export type VitalityCategory = {
  id: string;
  label: string;
  accentColor: string;
  accentTint: string;
  metricOrder: MetricKey[];
};

export type ScoreMap = Record<MetricKey, number | null>;

export const metricOrder: MetricKey[] = [
  'erectionStrength',
  'morningErections',
  'libido',
  'sexualThoughts',
  'energyLevels',
  'moodStability',
  'strengthEndurance',
  'concentrationSharpness',
  'bodyComposition',
  'sleepQuality',
];

const expandVitalityBands = (
  [zero, oneToThree, fourToSix, sevenToNine, ten]: [
    string,
    string,
    string,
    string,
    string,
  ],
): string[] => [
  zero,
  oneToThree,
  oneToThree,
  oneToThree,
  fourToSix,
  fourToSix,
  fourToSix,
  sevenToNine,
  sevenToNine,
  sevenToNine,
  ten,
];

export const metrics: Record<MetricKey, MetricDefinition> = {
  erectionStrength: {
    id: 'erectionStrength',
    label: 'Erection strength',
    definition:
      'Rate your ability to achieve and maintain erections firm enough for pleasurable sexual activity.',
    low: {
      anchor: 'No Erections At All [Complete ED]',
      detail:
        'A 0 means erections are absent or too weak for intercourse. Sexual function feels unavailable or unreliable in nearly every situation.',
    },
    high: {
      anchor: 'Rock Hard Erections [Peak rigidity typical of sexual prime]',
      detail:
        'A 10 means erections are strong, dependable, and easy to maintain. Sexual function feels effortless and fully available.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Erections At All [Complete ED]',
      'Larger but Not Hard [Not rigid enough for penetration]',
      'Hard but Not Rigid [Penetration possible but difficult to maintain]',
      'Hard Enough for Sex [Reliable rigidity, occasional difficulty]',
      'Rock Hard Erections [Peak rigidity like during sexual prime]',
    ]),
  },
  morningErections: {
    id: 'morningErections',
    label: 'Morning erections',
    definition: 'Rate the frequency and quality of erections upon waking.',
    low: {
      anchor: 'No Morning Wood [Erections never occur upon waking]',
      detail:
        'A 0 means you never notice erections when waking. The normal morning pattern feels entirely absent.',
    },
    high: {
      anchor:
        'Strong Daily Morning Wood [Frequency and rigidity typical of sexual prime]',
      detail:
        'A 10 means you wake with strong erections almost daily. The pattern feels regular, obvious, and consistent.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Morning Wood [Erections never occur upon waking]',
      'Rare and Weak [Infrequent and lacking firmness]',
      'Occasional and Partial [Some mornings, inconsistent rigidity]',
      'Frequent and Firm [Most mornings, with reliable rigidity]',
      'Strong Daily Morning Wood [Frequency and rigidity typical of sexual prime]',
    ]),
  },
  libido: {
    id: 'libido',
    label: 'Libido / sex drive (Interest in sex)',
    definition: 'Rate your overall desire for sexual activity.',
    low: {
      anchor: 'Zero Sex Drive [Depleted libido with no interest in sex whatsoever]',
      detail:
        'A 0 means sexual desire feels absent. Interest in intimacy or sexual thoughts is extremely low or nonexistent.',
    },
    high: {
      anchor: 'Robust Sex Drive [Peak libido typical of sexual prime]',
      detail:
        'A 10 means desire feels strong, healthy, and consistently available. Sexual interest is easy to access without feeling forced.',
    },
    selectedDescriptors: expandVitalityBands([
      'Zero Sex Drive [Depleted libido with no interest in sex whatsoever]',
      'Rare and Weak [Minimal desire, easily ignored]',
      'Occasional and Moderate [Some spontaneous desire, inconsistent intensity]',
      'Frequent and Strong [Regular desire, reliable interest]',
      'Robust Sex Drive [Peak libido typical of sexual prime]',
    ]),
    distinctionNote: {
      title: 'Sex Drive / Libido',
      description:
        'The strength of desire once it is present, regardless of where it comes from.',
      prompt: 'When the opportunity arises, how interested are you in sex?',
      bullets: [
        'This can still be high when desire is triggered by a partner, romantic context, or visual stimulus.',
        'It reflects how strongly you respond once sexual interest is activated.',
      ],
      keyTakeaway:
        'Score this item based on the strength of your desire once sex is on the table, whether that desire started on its own or was triggered by context.',
    },
  },
  sexualThoughts: {
    id: 'sexualThoughts',
    label: 'Frequency of sexual thoughts / fantasies',
    definition:
      'Rate how often you have spontaneous sexual thoughts or fantasies.',
    low: {
      anchor: 'No Sexual Thoughts or Fantasies [Sex never crosses your mind]',
      detail:
        'A 0 means spontaneous sexual thoughts do not show up. The mental side of desire feels almost completely switched off.',
    },
    high: {
      anchor:
        'Vivid Fantasies Throughout the Day [Frequency and vividness typical of sexual prime]',
      detail:
        'A 10 means sexual thoughts arise naturally and often. Desire feels mentally alive without needing to force it.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Sexual Thoughts or Fantasies [Sex never crosses your mind]',
      'Rare and Faint [Rarely arise on their own, vague and fleeting]',
      'Occasional and Mild [Some spontaneous thoughts, brief and unfocused]',
      'Frequent and Vivid [Daily spontaneous thoughts, clear and engaging]',
      'Vivid Fantasies Throughout the Day [Frequency and vividness typical of sexual prime]',
    ]),
    distinctionNote: {
      title: 'Spontaneous Sexual Thoughts / Fantasies',
      description:
        'How often sex originates in your mind on its own, without an external cause.',
      prompt: 'Does your brain bring up sex unprompted?',
      bullets: [
        'This reflects baseline neurological and hormonal sexual activation.',
        'A man can have decent libido when stimulated but still have very few spontaneous sexual thoughts.',
        'This pattern can appear when the mind rarely goes there on its own, even if sexual response is still possible when triggered.',
      ],
      keyTakeaway:
        'Score this item based on how often sexual thoughts arise naturally on their own, not how interested you become once sex is initiated or suggested.',
    },
  },
  energyLevels: {
    id: 'energyLevels',
    label: 'Energy and motivation',
    definition: 'Rate your overall daily energy and level of motivation.',
    low: {
      anchor: 'Extreme fatigue, no energy or motivation even for basic tasks',
      detail:
        'A 0 means you feel depleted and struggle to start even simple tasks. Physical and mental drive feel close to empty.',
    },
    high: {
      anchor: 'High energy all day, feeling vibrant and motivated',
      detail:
        'A 10 means energy feels steady, strong, and easy to direct. You feel eager to act and capable of following through.',
    },
    selectedDescriptors: expandVitalityBands([
      'Completely drained.',
      'Very low energy and motivation.',
      'Average energy with ups and downs.',
      'Strong energy and momentum.',
      'Vibrant and highly driven.',
    ]),
  },
  moodStability: {
    id: 'moodStability',
    label: 'Mood (Irritability, Depression, Anxiety)',
    definition: 'Rate your general mood stability and positivity.',
    low: {
      anchor: 'Severe depression, high irritability, or constant low mood',
      detail:
        'A 0 means your mood feels heavy, volatile, or persistently low. Calm and emotional steadiness are hard to access.',
    },
    high: {
      anchor: 'Consistently positive, calm, and happy mood',
      detail:
        'A 10 means your mood feels resilient, calm, and emotionally steady. Positivity feels natural rather than forced.',
    },
    selectedDescriptors: expandVitalityBands([
      'Very low and unstable.',
      'Frequent irritability, anxiety, or low mood.',
      'Mixed but manageable mood.',
      'Calm, steady, and resilient.',
      'Calm, happy, and highly steady.',
    ]),
  },
  strengthEndurance: {
    id: 'strengthEndurance',
    label: 'Strength and endurance',
    definition:
      'Rate your overall muscle strength and stamina to sustain physical effort.',
    low: {
      anchor: 'Severe loss of strength and very poor stamina',
      detail:
        'A 0 means physical effort feels unusually hard and output is far below normal. Strength and endurance both feel severely limited.',
    },
    high: {
      anchor: 'Peak strength and excellent stamina',
      detail:
        'A 10 means you feel powerful, resilient, and able to sustain effort well. Training and daily exertion feel strong and repeatable.',
    },
    selectedDescriptors: expandVitalityBands([
      'No usable reserve.',
      'Very weak and easily exhausted.',
      'Average output with mixed stamina.',
      'Strong with good endurance.',
      'Peak strength and stamina.',
    ]),
  },
  concentrationSharpness: {
    id: 'concentrationSharpness',
    label: 'Concentration and mental sharpness',
    definition: 'Rate your ability to focus and think clearly.',
    low: {
      anchor: 'Severe brain fog, poor concentration/memory',
      detail:
        'A 0 means focus is fragmented and mental clarity is difficult to sustain. Memory, attention, and sharp thinking all feel impaired.',
    },
    high: {
      anchor: 'Sharp focus, excellent memory and mental clarity',
      detail:
        'A 10 means your thinking feels crisp, organized, and reliable. Focus locks in easily and mental effort feels clean.',
    },
    selectedDescriptors: expandVitalityBands([
      'Severe brain fog.',
      'Poor focus and frequent forgetfulness.',
      'Average mental clarity with some fog.',
      'Strong focus and recall.',
      'Laser-sharp and fully clear.',
    ]),
  },
  bodyComposition: {
    id: 'bodyComposition',
    label: 'Body composition (Fat gain / Muscle loss)',
    definition: 'Rate changes in abdominal fat and muscle mass.',
    low: {
      anchor: 'Major increase in body fat (especially belly) and clear muscle loss',
      detail:
        'A 0 means body composition feels noticeably off, with clear fat gain and muscle loss. Your physique feels softer, weaker, and harder to maintain.',
    },
    high: {
      anchor: 'Lean, muscular build with minimal body fat',
      detail:
        'A 10 means you feel lean, strong, and physically well-composed. Muscle tone and body-fat balance feel close to ideal for you.',
    },
    selectedDescriptors: expandVitalityBands([
      'Significant fat gain and muscle loss.',
      'Clearly far below your baseline.',
      'Mixed, average composition.',
      'Lean, defined, and well-balanced.',
      'Peak body composition for you.',
    ]),
  },
  sleepQuality: {
    id: 'sleepQuality',
    label: 'Sleep quality and disturbances',
    definition: 'Rate how well you sleep and feel refreshed.',
    low: {
      anchor: 'Severe insomnia or poor sleep, always unrefreshed',
      detail:
        'A 0 means sleep is fragmented, hard to get, or not restorative at all. You wake up feeling tired and behind from the start.',
    },
    high: {
      anchor: 'Deep, restorative sleep every night, waking energized',
      detail:
        'A 10 means sleep feels deep, stable, and restorative. You wake feeling genuinely rested and ready for the day.',
    },
    selectedDescriptors: expandVitalityBands([
      'Sleep is severely disrupted.',
      'Poor sleep and low recovery.',
      'Average sleep with mixed recovery.',
      'Restful, consistent sleep.',
      'Deep, restorative sleep.',
    ]),
  },
};

export const categories: VitalityCategory[] = [
  {
    id: 'sexual-health',
    label: 'Sexual Health',
    accentColor: '#0ea5e9',
    accentTint: 'rgba(14, 165, 233, 0.14)',
    metricOrder: ['erectionStrength', 'morningErections', 'libido', 'sexualThoughts'],
  },
  {
    id: 'mental-vitality',
    label: 'Mental Vitality',
    accentColor: '#f97316',
    accentTint: 'rgba(249, 115, 22, 0.14)',
    metricOrder: ['energyLevels', 'concentrationSharpness', 'moodStability'],
  },
  {
    id: 'physical-vitality',
    label: 'Physical Vitality',
    accentColor: '#16a34a',
    accentTint: 'rgba(22, 163, 74, 0.14)',
    metricOrder: ['strengthEndurance', 'bodyComposition', 'sleepQuality'],
  },
];

export const buildEmptyScores = (): ScoreMap => ({
  erectionStrength: null,
  morningErections: null,
  libido: null,
  sexualThoughts: null,
  energyLevels: null,
  moodStability: null,
  strengthEndurance: null,
  concentrationSharpness: null,
  bodyComposition: null,
  sleepQuality: null,
});

export const getDescriptorText = (metric: MetricDefinition, value: number | null) => {
  if (value === null) return 'Set your score from 0 to 10.';
  if (value === 0) return metric.low.anchor;
  if (value === 10) return metric.high.anchor;
  return metric.selectedDescriptors[value] ?? `${value} / 10`;
};

export const vitalityBands = [
  {
    min: 80,
    max: 100,
    rangeLabel: '80 - 100',
    label: 'Strong vitality',
    color: '#16a34a',
  },
  {
    min: 60,
    max: 79,
    rangeLabel: '60 - 79',
    label: 'Mildly depleted vitality',
    color: '#ca8a04',
  },
  {
    min: 40,
    max: 59,
    rangeLabel: '40 - 59',
    label: 'Moderately depleted vitality',
    color: '#ea580c',
  },
  {
    min: 0,
    max: 39,
    rangeLabel: 'Below 40',
    label: 'Severely depleted vitality',
    color: '#dc2626',
  },
] as const;

export const getBand = (score: number) =>
  vitalityBands.find((band) => score >= band.min && score <= band.max) ??
  vitalityBands[vitalityBands.length - 1];

export const summarizeScores = (scores: ScoreMap) => {
  const values = Object.values(scores).filter(
    (value): value is number => typeof value === 'number',
  );
  const count = values.length;
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    count,
    total,
    isComplete: count === metricOrder.length,
    band: count === metricOrder.length ? getBand(total) : null,
  };
};
