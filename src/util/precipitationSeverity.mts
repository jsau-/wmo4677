import type { WeatherMetadataItem } from './WeatherMetadata.mjs';

/** The severity of occurring precipitation. */
export type PrecipitationSeverity = 'heavy' | 'moderate' | 'slight' | 'violent';

/**
 * Precipitation severities ordered by precedence, where a higher number denotes
 * "more severe".
 */
const precipitationSeverityPrecedences = {
  heavy: 2,
  moderate: 1,
  slight: 0,
  violent: 4,
} satisfies Record<PrecipitationSeverity, number>;

const sortedPrecipitationSeverities = (
  metadataItem: WeatherMetadataItem<number, string>
) => {
  if (metadataItem.precipitation !== 'current') {
    return null;
  }

  return [...metadataItem.possiblePrecipitationSeverities].sort((a, b) => {
    return (
      precipitationSeverityPrecedences[a] - precipitationSeverityPrecedences[b]
    );
  });
};

/**
 * Gets the highest (i.e. worst) possible precipitation severity for a given
 * metadata item. Useful e.g. when using WMO4677 where a given code could
 * correspond to both slight and moderate.
 *
 * @param metadataItem The metadata item to check.
 * @returns The highest possible precipitation severity for the metadata item,
 * or null if no precipitation severities were found.
 */
export const highestPossiblePrecipitationSeverity = (
  metadataItem: WeatherMetadataItem<number, string>
) => {
  const sorted = sortedPrecipitationSeverities(metadataItem);

  if (!sorted || !sorted.length) {
    return null;
  }

  return sorted[sorted.length - 1] as PrecipitationSeverity;
};

/**
 * Gets the lowest (i.e. least bad) possible precipitation severity for a given
 * metadata item. Useful e.g. when using WMO4677 where a given code could
 * correspond to both slight and moderate.
 *
 * @param metadataItem The metadata item to check.
 * @returns The lowest possible precipitation severity for the metadata item,
 * or null if no precipitation severities were found.
 */
export const lowestPossiblePrecipitationSeverity = (
  metadataItem: WeatherMetadataItem<number, string>
) => {
  const sorted = sortedPrecipitationSeverities(metadataItem);

  if (!sorted || !sorted.length) {
    return null;
  }

  return sorted[0] as PrecipitationSeverity;
};
