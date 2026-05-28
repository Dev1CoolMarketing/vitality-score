export const DEFAULT_DISCRETE_SLIDER_SNAP_THRESHOLD = 0.55;

export const clampDiscreteSliderValue = (
  value: number,
  min: number,
  max: number,
) => Math.max(min, Math.min(max, value));

export const getStableRoundedSliderValue = ({
  rawValue,
  lastRoundedValue,
  min,
  max,
  snapThreshold = DEFAULT_DISCRETE_SLIDER_SNAP_THRESHOLD,
}: {
  rawValue: number;
  lastRoundedValue: number;
  min: number;
  max: number;
  snapThreshold?: number;
}) => {
  const clampedRawValue = clampDiscreteSliderValue(rawValue, min, max);
  const clampedLastValue = clampDiscreteSliderValue(lastRoundedValue, min, max);

  if (Math.abs(clampedRawValue - clampedLastValue) < snapThreshold) {
    return clampedLastValue;
  }

  return clampDiscreteSliderValue(Math.round(clampedRawValue), min, max);
};
