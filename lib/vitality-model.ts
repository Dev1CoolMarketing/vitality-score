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

export type SupplementalSection = {
  title: string;
  // Supports inline bold via `**bold text**`.
  paragraphs?: string[];
  bullets?: string[];
  citations?: string[];
  keyTakeaway?: string;
};

export type MetricDefinition = {
  id: MetricKey;
  label: string;
  definition: string;
  low: { anchor: string; detail: string };
  high: { anchor: string; detail: string };
  selectedDescriptors: string[];
  supplementalSections?: SupplementalSection[];
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

const libidoAndThoughtsSupplementalSections: SupplementalSection[] = [
  {
    title:
      'Understanding the Difference: Sex Drive vs. Spontaneous Sexual Thoughts',
    paragraphs: [
      'These two attributes measure different aspects of sexual vitality and should be scored independently.',
      '**Sex Drive / Libido** — the strength of desire once it’s present, regardless of source.',
      '**Spontaneous Sexual Thoughts / Fantasies** — how often sex originates in your mind on its own, with no external cause.',
      'A man can have decent libido (responds well when stimulated) but zero spontaneous thoughts (mind never goes there on its own) — a classic pattern in low-testosterone states.',
    ],
    bullets: [
      '“When the opportunity arises, how interested are you in sex?”',
      'Can be measured even when triggered (e.g., partner’s initiation, romantic context, visual stimulus).',
      '“Does your brain bring up sex unprompted?”',
      'A marker of baseline neurological and hormonal sexual activation.',
    ],
  },
  {
    title: 'Citations and References',
    citations: [
      'Wu FC, Tajar A, Beynon JM, et al. Identification of Late-Onset Hypogonadism in Middle-Aged and Elderly Men. New England Journal of Medicine 2010;363(2):123–135. (The EMAS landmark study — established decreased frequency of spontaneous sexual thoughts as a primary symptom of low testosterone, distinct from libido.)',
      'O’Connor DB, Corona G, Forti G, et al. Assessment of sexual health in aging men in Europe: development and validation of the European Male Ageing Study sexual function questionnaire. Journal of Sexual Medicine 2008;5(6):1374–1385. (The EMAS-SFQ validated instrument that treats spontaneous sexual thoughts as a distinct measurable dimension separate from libido — supports the scoring-independently framework.)',
      'Travison TG, Morley JE, Araujo AB, O’Donnell AB, McKinlay JB. The relationship between libido and testosterone levels in aging men. Journal of Clinical Endocrinology & Metabolism 2006;91(7):2509–2513. (Population study establishing the testosterone-libido relationship — supports the “low-testosterone pattern” clinical observation in the callout.)',
    ],
  },
];

export const metrics: Record<MetricKey, MetricDefinition> = {
  erectionStrength: {
    id: 'erectionStrength',
    label: 'Erection Strength Score',
    definition: 'Rate the firmness and staying power of your erections',
    low: {
      anchor: 'No Erections At All\n[Complete ED]',
      detail:
        'A 0 means erections are absent. Penetrative sex is not possible and erectile function feels completely unavailable.',
    },
    high: {
      anchor: 'Rock Hard Erections\n[Peak rigidity typical of sexual prime]',
      detail:
        'A 10 means erections are maximally firm and stay rigid reliably through sex. Erectile function feels fully available and stable.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Erections At All\n[Complete ED]',
      'Larger but Not Firm\n[Too soft to penetrate]',
      "Firm but Doesn't Last\n[Penetrates but fades during sex]",
      'Hard and Lasting\n[Stays rigid until climax]',
      'Rock Hard Erections\n[Peak rigidity typical of sexual prime]',
    ]),
  },
  morningErections: {
    id: 'morningErections',
    label: 'Morning Erections Score',
    definition: 'Rate the frequency and firmness of erections upon waking',
    low: {
      anchor: 'No Morning Wood\n[None for months]',
      detail:
        'A 0 means morning erections have been absent for an extended period. The normal waking pattern feels completely missing.',
    },
    high: {
      anchor: 'Robust Morning Wood\n[Typical of sexual prime]',
      detail:
        'A 10 means waking erections are frequent, fully firm, and consistent in a way typical of sexual prime.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Morning Wood\n[None for months]',
      'Rare and Weak\n[1–3 per month, mostly soft]',
      'Occasional and Half-Firm\n[1–2 per week, never fully firm]',
      'Frequent and Firm\n[Hard 3–5 times a week]',
      'Robust Morning Wood\n[Typical of sexual prime]',
    ]),
    supplementalSections: [
      {
        title: 'Morning Erections and Male Vitality',
        paragraphs: [
          'Morning erections — clinically known as **nocturnal penile tumescence (NPT)** — occur involuntarily during REM sleep, typically multiple times per night with one final episode at waking. Unlike sex-related erections, they require no psychological or sexual stimulus.',
          '**Why they matter clinically.** Morning erections are the most direct non-invasive biomarker of two systems at once:',
          'Because morning erections occur during sleep — with no psychological input, no partner, no medication — they reveal baseline biological function uncontaminated by other variables.',
          '**Dissociation from sex-related erections.** In men with low serum testosterone levels, NPT can be markedly reduced even when sex-related erections (response to visual erotic stimuli) remain intact. This is because nocturnal erections are androgen-dependent, while erotic-stimulus-driven erections are partly androgen-independent.',
          'When scoring this scale, your morning erection frequency and firmness is one of the most clinically meaningful indicators of male vitality independent of relationship, mood, or psychological factors.',
        ],
        bullets: [
          '**Hormonal (testosterone-dependent).** Men with testosterone deficiency show significantly reduced NPT frequency, rigidity, and duration. Testosterone replacement therapy (TRT) restores morning erections in deficient men.',
          '**Vascular.** Healthy NPT requires intact penile arterial and endothelial function.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Granata AR, Rochira V, Lerchl A, Marrama P, Carani C. Relationship between sleep-related erections and testosterone levels in men. Journal of Andrology 1997;18(5):522–527. (Classic study establishing the direct testosterone-NPT relationship — supports the hormonal-dependence claim.)',
          'Carani C, Granata AR, Bancroft J, Marrama P. The effects of testosterone replacement on nocturnal penile tumescence and rigidity and erectile response to visual erotic stimuli in hypogonadal men. Psychoneuroendocrinology 1995;20(7):743–753. (Pivotal study proving the androgen-dependent NPT vs. androgen-independent visual-stimulus dissociation — supports the central clinical point of the callout.)',
          'Wu FC, Tajar A, Beynon JM, et al. Identification of Late-Onset Hypogonadism in Middle-Aged and Elderly Men. New England Journal of Medicine 2010;363(2):123–135. (EMAS landmark study — establishes poor morning erections as one of the three core symptoms of late-onset hypogonadism in a 3,300-man European cohort.)',
        ],
      },
    ],
  },
  libido: {
    id: 'libido',
    label: 'Libido / Sex Drive Score',
    definition: 'Rate the frequency and intensity of your sexual desire',
    low: {
      anchor: 'No Sex Drive\n[Depleted libido, no sexual desire]',
      detail:
        'A 0 means sexual desire feels absent. Libido is depleted and sexual interest does not meaningfully arise.',
    },
    high: {
      anchor: 'Robust Sex Drive\n[Peak libido typical of sexual prime]',
      detail:
        'A 10 means sexual desire is strong, frequent, and easily activated. Libido feels robust and typical of sexual prime.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Sex Drive\n[Depleted libido, no sexual desire]',
      'Rare and Weak\n[Minimal desire, easily ignored]',
      'Occasional and Moderate\n[Sporadic and mild desire]',
      'Frequent and Strong\n[Consistent intense urges, easily aroused]',
      'Robust Sex Drive\n[Peak libido typical of sexual prime]',
    ]),
    supplementalSections: libidoAndThoughtsSupplementalSections,
  },
  sexualThoughts: {
    id: 'sexualThoughts',
    label: 'Spontaneous Sexual Thoughts / Fantasies Score',
    definition:
      'Rate the frequency and vividness of unprompted sexual thoughts\nSpontaneous = unprompted, unaided, and unstimulated — your mind goes there on its own.',
    low: {
      anchor: 'No Sexual Thoughts or Fantasies\n[Sex never crosses your mind]',
      detail:
        'A 0 means spontaneous sexual thoughts do not show up. The mental side of desire feels almost completely switched off.',
    },
    high: {
      anchor: 'Vivid Fantasies Throughout the Day\n[Typical of sexual prime]',
      detail:
        'A 10 means sexual thoughts arise naturally and often. Desire feels mentally alive without needing to force it.',
    },
    selectedDescriptors: expandVitalityBands([
      'No Sexual Thoughts or Fantasies\n[Sex never crosses your mind]',
      'Rare and Faint\n[A few per week, dim and fleeting]',
      'Occasional and Mild\n[A few per day, brief and unfocused]',
      'Frequent and Vivid\n[Many per day, clear and engaging]',
      'Vivid Fantasies Throughout the Day\n[Typical of sexual prime]',
    ]),
    supplementalSections: libidoAndThoughtsSupplementalSections,
  },
  energyLevels: {
    id: 'energyLevels',
    label: 'Mental Energy and Motivation Score',
    definition: 'Rate how mentally charged and engaged you feel daily',
    low: {
      anchor:
        'Depleted Mental Energy\n[No fuel or motivation — even for basic tasks]',
      detail:
        'A 0 means mental energy feels depleted and motivation is hard to access, even for basic tasks. Starting or sustaining effort feels unusually difficult.',
    },
    high: {
      anchor: 'Peak Mental Energy\n[Vibrant and motivated all day]',
      detail:
        'A 10 means you feel mentally vibrant, engaged, and motivated all day. Focused effort feels natural and sustainable.',
    },
    selectedDescriptors: expandVitalityBands([
      'Depleted Mental Energy\n[No fuel or motivation — even for basic tasks]',
      'Low and Unmotivated\n[Drained and disengaged]',
      'Moderate and Inconsistent\n[Decent energy and motivation that fluctuate]',
      'Energized and Driven\n[Reliable energy and motivation]',
      'Peak Mental Energy\n[Vibrant and motivated all day]',
    ]),
    supplementalSections: [
      {
        title: 'Mental Energy and Male Vitality',
        paragraphs: [
          'Reduced vigor, drive, and motivation — the “nothing matters anymore” feeling — are recognized symptoms of testosterone deficiency. The European Male Aging Study of over 3,300 men identified low energy and vigor as a primary symptom cluster of testosterone deficiency, and the Endocrine Society Clinical Practice Guidelines list decreased energy, motivation, and self-confidence among the major presenting symptoms of androgen deficiency.',
          '**Treatment evidence is mixed.** The NIH-funded Testosterone Trials Vitality Trial in 790 older men found that testosterone replacement did not reliably improve fatigue, though it did slightly improve mood and depressive symptoms — suggesting energy benefits may flow indirectly through mood improvement. The data is clearer in men with clinically low serum testosterone levels than for general age-related fatigue.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Wu FC, Tajar A, Beynon JM, et al. Identification of Late-Onset Hypogonadism in Middle-Aged and Elderly Men. New England Journal of Medicine 2010;363(2):123–135. (EMAS landmark study of 3,300+ men — establishes reduced vigor and energy as core symptoms of testosterone deficiency.)',
          'Snyder PJ, Bhasin S, Cunningham GR, et al. Effects of Testosterone Treatment in Older Men. New England Journal of Medicine 2016;374(7):611–624. (The Testosterone Trials — the Vitality Trial component directly tests whether T improves energy and fatigue in 790 older men; honest null result on fatigue with secondary mood benefit.)',
          'Bhasin S, Brito JP, Cunningham GR, et al. Testosterone Therapy in Men With Hypogonadism: An Endocrine Society Clinical Practice Guideline. Journal of Clinical Endocrinology & Metabolism 2018;103(5):1715–1744. (Endocrine Society guidelines — lists decreased energy, motivation, and self-confidence among major presenting symptoms of androgen deficiency.)',
        ],
      },
    ],
  },
  moodStability: {
    id: 'moodStability',
    label: 'Mood Score',
    definition:
      'Rate your daily emotional state — stable and positive vs. irritable, depressed, or anxious',
    low: {
      anchor:
        'Severe Distress\n[Persistent depression, irritability, or anxiety]',
      detail:
        'A 0 means depression, irritability, or anxiety feel persistent enough to shape most days. Emotional steadiness is difficult to access.',
    },
    high: {
      anchor:
        'Peak Emotional Wellbeing\n[Consistently positive, calm, and resilient]',
      detail:
        'A 10 means you feel consistently positive, calm, and resilient. Stress happens, but you recover without getting pulled off course for long.',
    },
    selectedDescriptors: expandVitalityBands([
      'Severe Distress\n[Persistent depression, irritability, or anxiety]',
      'Low and Reactive\n[Down, anxious, or easily upset most days]',
      'Mixed and Unsteady\n[Mood swings with daily circumstances]',
      'Stable and Positive\n[Generally upbeat, bounce back from stress]',
      'Peak Emotional Wellbeing\n[Consistently positive, calm, and resilient]',
    ]),
    supplementalSections: [
      {
        title: 'Mood and Male Vitality',
        paragraphs: [
          'Depression, anxiety, irritability, and emotional flatness are well-documented symptoms of low serum testosterone levels. Depression prevalence in men with low or borderline testosterone runs several-fold higher than in men with normal testosterone levels. The “grumpy man” phenotype — persistent irritability and dysphoria — frequently reflects hormonal status.',
          '**Treatment evidence is the strongest among mental vitality domains.** A 2019 JAMA Psychiatry meta-analysis of 27 randomized controlled trials found testosterone treatment produces statistically significant reductions in depressive symptoms in men with testosterone deficiency. Landmark RCTs by Pope (refractory depression) and Shores (subthreshold depression in older men with low testosterone) demonstrated similar antidepressant effects. Testosterone is not a substitute for antidepressants in major depressive disorder, but addressing the hormonal deficit can produce meaningful improvement when low testosterone is contributing.',
          '**The diagnostic value of the combined pattern.** Mood symptoms in isolation may reflect primary depression, stress, or life circumstances. But when mood symptoms combine with reduced mental energy and cognitive haziness — and particularly with sexual function decline (low libido, poor morning erections) and physical changes (visceral fat gain, muscle loss) — the constellation is more characteristic of hormonal etiology than purely psychological depression. The combination, not any single symptom, is the diagnostic signal.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Walther A, Breidenstein J, Miller R. Association of Testosterone Treatment With Alleviation of Depressive Symptoms in Men: A Systematic Review and Meta-analysis. JAMA Psychiatry 2019;76(1):31–40. (27-RCT meta-analysis — the strongest pooled evidence that testosterone reduces depressive symptoms in men with testosterone deficiency.)',
          'Shores MM, Kivlahan DR, Sadak TI, Li EJ, Matsumoto AM. A randomized, double-blind, placebo-controlled study of testosterone treatment in hypogonadal older men with subthreshold depression (dysthymia or minor depression). Journal of Clinical Psychiatry 2009;70(7):1009–1016. (Landmark RCT — testosterone treatment improved depressive symptoms in older men with low testosterone and subthreshold depression.)',
          'Pope HG, Cohane GH, Kanayama G, Siegel AJ, Hudson JI. Testosterone gel supplementation for men with refractory depression: a randomized, placebo-controlled trial. American Journal of Psychiatry 2003;160(1):105–111. (Landmark RCT — testosterone gel produced significant antidepressant effects in men with refractory depression and low/borderline testosterone levels.)',
        ],
      },
    ],
  },
  strengthEndurance: {
    id: 'strengthEndurance',
    label: 'Strength and Stamina Score',
    definition:
      'Rate your muscular strength and capacity for sustained physical effort',
    low: {
      anchor:
        'Depleted Strength and Stamina\n[Even light activity is unsustainable]',
      detail:
        'A 0 means physical effort feels unusually hard and output is far below normal. Strength and endurance both feel severely limited.',
    },
    high: {
      anchor: 'Peak Strength and Stamina\n[Powerful and tireless]',
      detail:
        'A 10 means you feel powerful, resilient, and able to sustain effort well. Training and daily exertion feel strong and repeatable.',
    },
    selectedDescriptors: expandVitalityBands([
      'Depleted Strength and Stamina\n[Even light activity is unsustainable]',
      'Weak and Easily Exhausted\n[Brief exertion leaves you drained]',
      'Suboptimal with Limited Endurance\n[Intense effort cannot last]',
      'Strong and Enduring\n[Vigorous effort is sustainable]',
      'Peak Strength and Stamina\n[Powerful and tireless]',
    ]),
  },
  concentrationSharpness: {
    id: 'concentrationSharpness',
    label: 'Concentration and Mental Sharpness Score',
    definition: 'Rate your ability to focus and think clearly',
    low: {
      anchor: "Severe Brain Fog\n[Words won't come, memory is failing]",
      detail:
        "A 0 means brain fog is severe enough that words feel hard to access and memory feels unreliable. Concentration and mental clarity both feel significantly impaired.",
    },
    high: {
      anchor: 'Peak Mental Acuity\n[Instant recall, ideas flow effortlessly]',
      detail:
        'A 10 means focus is crisp, memory is reliable, and ideas come together effortlessly. Complex thinking feels clean and immediate.',
    },
    selectedDescriptors: expandVitalityBands([
      "Severe Brain Fog\n[Words won't come, memory is failing]",
      'Foggy and Scattered\n[Re-read sentences, lose your train of thought]',
      'Hazy and Inconsistent\n[Productive bursts in between mental slumps]',
      'Focused and Clear\n[Can tackle complex tasks and retain details]',
      'Peak Mental Acuity\n[Instant recall, ideas flow effortlessly]',
    ]),
    supplementalSections: [
      {
        title: 'Cognition and Male Vitality',
        paragraphs: [
          'Brain fog, memory lapses, and difficulty concentrating are common cognitive complaints in men with low serum testosterone levels. The effects of androgens on cognition are domain-specific — most consistently affecting verbal memory, spatial memory, and executive function.',
          '**Treatment evidence is mixed.** Cherrier and colleagues demonstrated that testosterone supplementation improved verbal and spatial memory in healthy older men. A 2025 systematic review found that androgen replacement significantly improves executive function and memory in men with testosterone deficiency. However, the NIH-funded TTrials Cognitive Function trial in older men with age-associated memory impairment found no cognitive benefit from testosterone — suggesting hormonal therapy is most relevant when cognitive symptoms align with clearly low testosterone, not generalized age-related decline.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Cherrier MM, Asthana S, Plymate S, et al. Testosterone supplementation improves spatial and verbal memory in healthy older men. Neurology 2001;57(1):80–88. (Landmark randomized placebo-controlled study — first to demonstrate testosterone supplementation improves both verbal and spatial memory in older men.)',
          'Resnick SM, Matsumoto AM, Stephens-Shields AJ, et al. Testosterone Treatment and Cognitive Function in Older Men With Low Testosterone and Age-Associated Memory Impairment. JAMA 2017;317(7):717–727. (TTrials Cognitive Function trial — large RCT showing testosterone did NOT improve memory or other cognitive domains in older men with age-associated memory impairment; provides honest counter-evidence.)',
          'Wang B, Liu X, Chen W, Liu L. Effects of androgen replacement therapy on cognitive function in patients with hypogonadism: A systematic review and meta-analysis. Biomedical Reports 2025;22(6):105. (Recent meta-analysis of 14 studies — androgen replacement significantly improves executive function and memory in men with testosterone deficiency, with domain-specific effects.)',
        ],
      },
    ],
  },
  bodyComposition: {
    id: 'bodyComposition',
    label: 'Physique Composition Score',
    definition: 'Rate your muscle mass and accumulation of abdominal fat',
    low: {
      anchor: 'Severe Atrophy and Obesity\n[Weak with a distended belly]',
      detail:
        'A 0 means body composition feels noticeably off, with clear fat gain and muscle loss. Your physique feels softer, weaker, and harder to maintain.',
    },
    high: {
      anchor: 'Peak Physique™\n[Athletic build with toned abs]',
      detail:
        'A 10 means you feel lean, strong, and physically well-composed. Muscle tone and body-fat balance feel close to ideal for you.',
    },
    selectedDescriptors: expandVitalityBands([
      'Severe Atrophy and Obesity\n[Weak with a distended belly]',
      'Soft and Fat\n[Untoned with a heavy belly]',
      'Suboptimal\n[Modest musculature, soft midsection]',
      'Muscular and Lean\n[Defined muscle mass with a flat middle]',
      'Peak Physique™\n[Athletic build with toned abs]',
    ]),
    supplementalSections: [
      {
        title: 'Understanding the Difference: Visceral vs. Subcutaneous Fat',
        paragraphs: [
          'Not all body fat is the same. Two distinct types affect your vitality differently:',
          '**Visceral fat** — deep abdominal fat stored behind the muscle wall, around the internal organs. It firmly projects the belly outward (the classic “beer belly” or “potbelly”) and is the clinically meaningful marker of male vitality.',
          '**Subcutaneous fat** — soft, pinchable fat under the skin, distributed across love handles, hips, and thighs. Less metabolically active and less directly linked to testosterone, though excess amounts still contribute to overall metabolic burden.',
          'When scoring, weight the belly heavily. A waist circumference greater than 40 inches (102 cm) is a clinical warning sign of significant visceral fat.',
        ],
        bullets: [
          '**Actively suppresses testosterone** by converting it to estrogen through the aromatase enzyme.',
          'Drives insulin resistance, inflammation, and metabolic syndrome.',
          'A man with skinny arms and a firm protruding gut shows the classic low-testosterone body composition signature — even if his overall weight looks normal.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Tchernof A, Després JP. Pathophysiology of human visceral obesity: an update. Physiological Reviews 2013;93(1):359–404. (The comprehensive clinical review of visceral vs. subcutaneous fat metabolism — supports the dual-type framework and the visceral fat → metabolic dysfunction chain.)',
          'Cohen PG. Aromatase, adiposity, aging and disease. The hypogonadal-metabolic-atherogenic-disease and aging connection. Medical Hypotheses 2001;56(6):702–708. (The canonical paper for the visceral fat → aromatase → testosterone-to-estrogen conversion mechanism — directly supports the “Actively suppresses testosterone” bullet.)',
          'Ross R, Neeland IJ, Yamashita S, et al. Waist circumference as a vital sign in clinical practice: a Consensus Statement from the IAS and ICCR Working Group on Visceral Obesity. Nature Reviews Endocrinology 2020;16(3):177–189. (The international consensus document supporting the 40-inch / 102 cm waist circumference clinical threshold.)',
        ],
      },
    ],
  },
  sleepQuality: {
    id: 'sleepQuality',
    label: 'Restorative Sleep Score',
    definition: 'Rate your sleep quality and daily restoration',
    low: {
      anchor: 'Severe Insomnia and Exhaustion\n[<5 hrs, depleted days]',
      detail:
        'A 0 means sleep is fragmented, hard to get, or not restorative at all. You wake up feeling tired and behind from the start.',
    },
    high: {
      anchor: 'Peak Restorative Sleep\n[7–9 hrs deep sleep, full restoration]',
      detail:
        'A 10 means sleep feels deep, stable, and restorative. You wake feeling genuinely rested and ready for the day.',
    },
    selectedDescriptors: expandVitalityBands([
      'Severe Insomnia and Exhaustion\n[<5 hrs, depleted days]',
      'Insufficient and Interrupted\n[5–6 hrs broken sleep, lingering fatigue]',
      'Suboptimal\n[6–7 hrs light sleep, groggy mornings]',
      'Restful and Refreshing\n[7–8 hrs sound sleep, refreshed mornings]',
      'Peak Restorative Sleep\n[7–9 hrs deep sleep, full restoration]',
    ]),
    supplementalSections: [
      {
        title: 'Restorative Sleep and Male Vitality',
        paragraphs: [
          'Testosterone is produced during sleep — T levels rise after sleep onset and peak during the first REM cycle. Just one week of 5-hour sleep drops daytime testosterone by 10–15% in healthy young men, equivalent to aging 10–15 years (Leproult & Van Cauter, JAMA 2011).',
          '**Hours alone aren’t enough.** Two components define restorative sleep:',
          'Eight hours of broken sleep ≠ eight hours of restorative sleep. When scoring, weight both duration and how restored you feel upon waking.',
        ],
        bullets: [
          '**Deep sleep** (slow-wave / Stage 3) drives muscle repair and growth hormone secretion. Most occurs in the first half of the night.',
          '**REM sleep** drives testosterone production and cognitive recovery. Concentrates in the second half of the night.',
        ],
      },
      {
        title: 'Citations and References',
        citations: [
          'Leproult R, Van Cauter E. Effect of 1 week of sleep restriction on testosterone levels in young healthy men. JAMA 2011;305(21):2173–2174. (The landmark study cited in the callout body — establishes the 10–15% testosterone drop equivalent to aging 10–15 years.)',
          'Su L, Zhang SZ, Zhu J, Wu J, Jiao YZ. Effect of partial and total sleep deprivation on serum testosterone in healthy males: a systematic review and meta-analysis. Sleep Medicine 2021;88:267–273. (Meta-analysis of 18 studies and 252 men — establishes total sleep deprivation as significantly reducing serum testosterone levels.)',
          'Van Cauter E, Leproult R, Plat L. Age-related changes in slow wave sleep and REM sleep and relationship with growth hormone and cortisol levels in healthy men. JAMA 2000;284(7):861–868. (The foundational paper on slow-wave sleep and growth hormone secretion — supports the deep-sleep / muscle repair / GH bullet.)',
        ],
      },
    ],
  },
};

export const categories: VitalityCategory[] = [
  {
    id: 'sexual-health',
    label: 'Sexual Vitality Score™',
    accentColor: '#0ea5e9',
    accentTint: 'rgba(14, 165, 233, 0.14)',
    metricOrder: [
      'erectionStrength',
      'morningErections',
      'libido',
      'sexualThoughts',
    ],
  },
  {
    id: 'mental-vitality',
    label: 'Mental Vitality Score™',
    accentColor: '#f97316',
    accentTint: 'rgba(249, 115, 22, 0.14)',
    metricOrder: ['energyLevels', 'concentrationSharpness', 'moodStability'],
  },
  {
    id: 'physical-vitality',
    label: 'Physical Vitality Score™',
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

export const getDescriptorText = (
  metric: MetricDefinition,
  value: number | null,
) => {
  if (value === null) return '';
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
