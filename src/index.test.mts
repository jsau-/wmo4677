import * as library from './index.mjs';
import * as openmeteo from './openmeteo/index.mjs';
import * as wmo4677 from './wmo4677/index.mjs';
import { expect, test } from 'vitest';
import {
  highestPossiblePrecipitationSeverity,
  lowestPossiblePrecipitationSeverity,
} from './util/precipitationSeverity.mjs';

test('exports expected modules', () => {
  expect(Object.keys(library)).toEqual([
    'highestPossiblePrecipitationSeverity',
    'lowestPossiblePrecipitationSeverity',
    'openmeteo',
    'wmo4677',
  ]);

  expect(library.highestPossiblePrecipitationSeverity).toBe(
    highestPossiblePrecipitationSeverity
  );

  expect(library.lowestPossiblePrecipitationSeverity).toBe(
    lowestPossiblePrecipitationSeverity
  );

  expect(library.openmeteo).toBe(openmeteo);
  expect(library.wmo4677).toBe(wmo4677);
});
