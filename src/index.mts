import * as openmeteo from './openmeteo/index.mjs';
import * as wmo4677 from './wmo4677/index.mjs';
import {
  type PrecipitationSeverity,
  highestPossiblePrecipitationSeverity,
  lowestPossiblePrecipitationSeverity,
} from './util/precipitationSeverity.mjs';
import type {
  WeatherMetadata,
  WeatherMetadataItem,
} from './util/WeatherMetadata.mjs';
import type { PrecipitationType } from './util/PrecipitationType.mjs';

export type {
  PrecipitationSeverity,
  PrecipitationType,
  WeatherMetadataItem,
  WeatherMetadata,
};

export {
  highestPossiblePrecipitationSeverity,
  lowestPossiblePrecipitationSeverity,
  openmeteo,
  wmo4677,
};
