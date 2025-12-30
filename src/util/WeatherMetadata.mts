import type { PrecipitationSeverity } from './precipitationSeverity.mjs';
import type { PrecipitationType } from './PrecipitationType.mjs';

/**
 * Metadata about a given single WMO4677 present-weather code.
 */
export type WeatherMetadataItem<Code extends number, Key extends string> = {
  /** The WMO4677 weather code for the present weather. */
  code: Code;
  /**
   * The description of the WMO4677 present-weather code.
   * @see https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
   */
  description: string;
  /** Is a dust or sandstorm currently occurring? */
  dustOrSandstorm: boolean;
  /** Is fog or mist currently occurring? */
  fogOrMist: boolean;
  /**
   * A lookup key which can be used to retrieve the WMO4677 code from
   * `wmo4677NamesToCodes`.
   */
  key: Key;
  /** Is a thunderstorm currently occurring? */
  thunderstorm: boolean;
} & (
  | {
      /** Precipitation either occurred in the preceding hour, or not recently. */
      precipitation: 'in_preceding_hour' | 'none';
    }
  | {
      /** How severe could the precipitation possibly be? */
      possiblePrecipitationSeverities: [
        PrecipitationSeverity,
        ...PrecipitationSeverity[],
      ];
      /** All potential precipitation types involved in the current precipitation. */
      possiblePrecipitationTypes: [PrecipitationType, ...PrecipitationType[]];
      /** Precipitation is currently occurring. */
      precipitation: 'current';
      /** The primary type of precipitation associated with this code. */
      primaryPrecipitationType: PrecipitationType;
    }
);

/**
 * Metadata about all possible weather codes, indexed by the code number.
 *
 * @example ```typescript
 * const myCodeNamesToCodeNumbers = {
 *   CLEAR_SKY: 0,
 *   MODERATE_SNOW: 1,
 * } as const;
 *
 * const myCodeMetadata = {
 *   0: {
 *     code: 0,
 *     description: '...',
 *     dustOrSandstorm: false,
 *     fogOrMist: false,
 *     key: 'CLEAR_SKY',
 *     precipitation: 'none',
 *     thunderstorm: false,
 *   },
 *   1: {
 *     code: 1,
 *     description: '...',
 *     dustOrSandstorm: false,
 *     fogOrMist: false,
 *     key: 'MODERATE_SNOW',
 *     possiblePrecipitationSeverities: ['moderate'],
 *     possiblePrecipitationTypes: ['snow'],
 *     precipitation: 'current',
 *     primaryPrecipitationType: 'snow',
 *     thunderstorm: false,
 *   },
 * } as const satisfies WeatherMetadata<typeof myCodeNamesToCodeNumbers>;
 * ```
 */
export type WeatherMetadata<T extends Record<string, number>> = {
  [K in keyof T & string as T[K]]: WeatherMetadataItem<T[K], K>;
};
