import { describe, expect, it } from 'vitest';
import {
  highestPossiblePrecipitationSeverity,
  lowestPossiblePrecipitationSeverity,
} from './precipitationSeverity.mjs';

describe('highestPossiblePrecipitationSeverity', () => {
  it('returns null if no current precipitation', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        precipitation: 'none',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it('returns null if precipitation in preceding hour', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        precipitation: 'none',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it('returns null if no precipitation severities provided due to invalid types', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        // @ts-expect-error Simulating someone skipping typechecking and passing
        // an empty array which is invalid per our typings.
        possiblePrecipitationSeverities: [],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it.each(['slight', 'moderate', 'heavy', 'violent'] as const)(
    'returns the single value "%s" if the only provided precipitation severity',
    (severity) => {
      expect(
        highestPossiblePrecipitationSeverity({
          code: 0,
          description: '',
          dustOrSandstorm: false,
          fogOrMist: false,
          key: 'foo',
          possiblePrecipitationSeverities: [severity],
          possiblePrecipitationTypes: ['rain'],
          precipitation: 'current',
          primaryPrecipitationType: 'rain',
          thunderstorm: false,
        })
      ).toBe(severity);
    }
  );

  it.each(['slight', 'moderate', 'heavy', 'violent'] as const)(
    'returns the single value "%s" if duplicate precipitation severities provided',
    (severity) => {
      expect(
        highestPossiblePrecipitationSeverity({
          code: 0,
          description: '',
          dustOrSandstorm: false,
          fogOrMist: false,
          key: 'foo',
          possiblePrecipitationSeverities: [
            severity,
            'slight',
            'slight',
            severity,
          ],
          possiblePrecipitationTypes: ['rain'],
          precipitation: 'current',
          primaryPrecipitationType: 'rain',
          thunderstorm: false,
        })
      ).toBe(severity);
    }
  );

  it('returns violent if all severities provided', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: [
          'moderate',
          'violent',
          'heavy',
          'slight',
        ],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('violent');
  });

  it('returns heavy if all severities heavy-down provided', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: ['moderate', 'heavy', 'slight'],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('heavy');
  });

  it('returns moderate if all severities heavy-down provided', () => {
    expect(
      highestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: ['moderate', 'slight'],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('moderate');
  });
});

describe('lowestPossiblePrecipitationSeverity', () => {
  it('returns null if no current precipitation', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        precipitation: 'none',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it('returns null if precipitation in preceding hour', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        precipitation: 'none',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it('returns null if no precipitation severities provided due to invalid types', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        // @ts-expect-error Simulating someone skipping typechecking and passing
        // an empty array which is invalid per our typings.
        possiblePrecipitationSeverities: [],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBeNull();
  });

  it.each(['slight', 'moderate', 'heavy', 'violent'] as const)(
    'returns the single value "%s" if the only provided precipitation severity',
    (severity) => {
      expect(
        lowestPossiblePrecipitationSeverity({
          code: 0,
          description: '',
          dustOrSandstorm: false,
          fogOrMist: false,
          key: 'foo',
          possiblePrecipitationSeverities: [severity],
          possiblePrecipitationTypes: ['rain'],
          precipitation: 'current',
          primaryPrecipitationType: 'rain',
          thunderstorm: false,
        })
      ).toBe(severity);
    }
  );

  it.each(['slight', 'moderate', 'heavy', 'violent'] as const)(
    'returns the single value "%s" if duplicate precipitation severities provided',
    (severity) => {
      expect(
        lowestPossiblePrecipitationSeverity({
          code: 0,
          description: '',
          dustOrSandstorm: false,
          fogOrMist: false,
          key: 'foo',
          possiblePrecipitationSeverities: [
            severity,
            'violent',
            'violent',
            severity,
          ],
          possiblePrecipitationTypes: ['rain'],
          precipitation: 'current',
          primaryPrecipitationType: 'rain',
          thunderstorm: false,
        })
      ).toBe(severity);
    }
  );

  it('returns slight if all severities provided', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: [
          'moderate',
          'violent',
          'heavy',
          'slight',
        ],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('slight');
  });

  it('returns heavy if all severities heavy-up provided', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: ['violent', 'heavy'],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('heavy');
  });

  it('returns moderate if all severities moderate-up provided', () => {
    expect(
      lowestPossiblePrecipitationSeverity({
        code: 0,
        description: '',
        dustOrSandstorm: false,
        fogOrMist: false,
        key: 'foo',
        possiblePrecipitationSeverities: ['moderate', 'heavy', 'violent'],
        possiblePrecipitationTypes: ['rain'],
        precipitation: 'current',
        primaryPrecipitationType: 'rain',
        thunderstorm: false,
      })
    ).toBe('moderate');
  });
});
