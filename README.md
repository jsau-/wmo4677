# wmo4677

[![npm version](https://img.shields.io/npm/v/wmo4677.svg)](https://www.npmjs.com/package/wmo4677)
[![build status](https://github.com/jsau-/wmo4677/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jsau-/wmo4677/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/wmo4677.svg)](https://www.npmjs.com/package/wmo4677)

[WMO4677](https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
describes the present weather as reported from a manned weather station
using numeric codes ranging `00` to `99`.

Working with these codes can sometimes be a bit of a pain since while the codes
are broken down into loose continuous blocks (like range `00-49` denoting no
current precipitation) knowing the _type_ of precipitation, or its
_possible severity_ often involves defining your own lookup tables / metadata.

This library aims to provide:

- Lookup objects for retrieving the WMO4677 code number from a human-readable name
- Metadata about each WMO4677 code number including
  - Is there any current precipitation? And if so:
    - What possible precipitation types are involved? (A given code number may include several possible precipitation types, e.g. code `69` which refers to rain, drizzle, and snow)
    - What is the primary type of precipitation associated with this code number? (e.g. the above example for code `69`, the primary type is rain)
    - How severe could this precipitation type be? (Code numbers may refer to multiple possible severities)
  - Is a dust or sandstorm currently occurring?
  - Is fog or mist currently occurring?
  - Is a thunderstorm currently occurring?
- Support for the canonical WMO4677 code table, as well as [`openmeteo`'s own interpretations of the WMO
  present weather codes](https://open-meteo.com/en/docs#weather_variable_documentation). While you likely don't strictly need this library to deal with `openmeteo` as its representation is a much reduced subset you may find some value in the categorisations included.

# Installation

```bash
npm i --save-exact wmo4677
```

# Samples

## Finding the code number for a given human-readable name

Depending on your use-case, you'll want either the `wmo4677` codes, or the
`openmeteo` codes.

```typescript
import { openmeteo, wmo4677 } from 'wmo4677';

// 66
const openmeteoCodeNumber = openmeteo.codes.FREEZING_RAIN_LIGHT;
const wmo4677CodeNumber = wmo4677.codes.RAIN_FREEZING_SLIGHT;
```

## Finding the metadata for a given code number

As above, this depends on whether you're using `wmo4677` directly, or the
`openmeteo` codes.

Metadata is indexed by the code number - if you already have the code number
e.g. from an API, you can use that - otherwise you _can_ still look up the
code number using its human-readable name.

```typescript
import { openmeteo, wmo4677 } from 'wmo4677';

/*
  {
    code: 66,
    description: 'Light freezing rain',
    dustOrSandstorm: false,
    fogOrMist: false,
    key: 'FREEZING_RAIN_LIGHT',
    possiblePrecipitationSeverities: ['slight'],
    possiblePrecipitationTypes: ['rain'],
    precipitation: 'current',
    primaryPrecipitationType: 'rain',
    thunderstorm: false,
  }
*/
openmeteo.metadata[66];
openmeteo.metadata[openmeteo.codes.FREEZING_RAIN_LIGHT];

/*
  {
    code: 66,
    description: 'Rain, freezing, slight',
    dustOrSandstorm: false,
    fogOrMist: false,
    key: 'RAIN_FREEZING_SLIGHT',
    possiblePrecipitationSeverities: ['slight'],
    possiblePrecipitationTypes: ['rain'],
    precipitation: 'current',
    primaryPrecipitationType: 'rain',
    thunderstorm: false,
  }
*/
wmo4677.metadata[66];
openmeteo.metadata[wmo4677.codes.RAIN_FREEZING_SLIGHT];
```

## Getting precipitation severities

A given code number _may_ (when dealing with WMO4677) correspond to several
potential severities. The library currently returns an array of all possible
severities, but includes helper functions for getting the highest (i.e. worst)
possible severity as well as the lowest (i.e. least bad) severity for a given
weather code's metadata.

(You may not need this when dealing with `openmeteo` as none of its code points
contain this ambiguity.)

```typescript
import {
  highestPossiblePrecipitationSeverity,
  lowestPossiblePrecipitationSeverity,
  wmo4677,
} from 'wmo4677';

const wmo4677Metadata =
  wmo4677.metadata[wmo4677.codes.RAIN_OR_DRIZZLE_AND_SNOW_MODERATE_OR_HEAVY];

// ['moderate', 'heavy']
wmo4677Metadata.possiblePrecipitationSeverities;

// 'heavy'
highestPossiblePrecipitationSeverity(wmo4677Metadata);

// 'moderate'
lowestPossiblePrecipitationSeverity(wmo4677Metadata);
```

## Rendering an appropriate weather icon for `openmeteo`

N.B. If using the full WMO4677 code space rather than `openmeteo` you may need
to handle additional precipitation types like `hail` or `ice`, and the codes
relating to cloud cover may have different interpretations.

```typescript
import {
  highestPossiblePrecipitationSeverity,
  openmeteo,
} from 'wmo4677';

// See https://www.npmjs.com/package/openmeteo for `openmeteo` API package / info
const { currentWeatherCode } = await getWeatherCodeFromOpenmeteo({ lat, long });

const weatherCodeMetadata = openmeteo.metadata[currentWeatherCode];

if (weatherCodeMetadata.thunderstorm) {
  return <ThunderstormIcon />;
}

if (weatherCodeMetadata.dustOrSandstorm) {
  return <DustStormIcon />;
}

if (weatherCodeMetadata.fogOrMist) {
  return <FogIcon />;
}

if (weatherCodeMetadata.precipitation === 'current') {
  const { primaryPrecipitationType } = weatherCodeMetadata;
  const highestPossibleSeverity = highestPossiblePrecipitationSeverity(weatherCodeMetadata);

  switch (primaryPrecipitationType) {
    case 'drizzle':
      return <DrizzleIcon severity={highestPossibleSeverity} />;
    case 'rain':
      return <RainIcon severity={highestPossibleSeverity} />;
    case 'snow':
      return <SnowIcon severity={highestPossibleSeverity} />;
  }
}

if (
  weatherCodeMetadata.code === openmeteo.codes.OVERCAST
    || weatherCodeMetadata.code === openmeteo.codes.PARTLY_CLOUDY
    || weatherCodeMetadata.code === openmeteo.codes.MAINLY_CLEAR
) {
  return <CloudyIcon />;
}

return <ClearSkyIcon />;
```

# Contributing

While contributions are appreciated, they may be rejected if not in line with
the intended project direction. It's recommended to check before undertaking a
major piece of work and/or refactoring.

Contributions should be based off the `develop` branch, and any pull requests
made into `develop`.

Pull requests should include a corresponding entry in `CHANGELOG.md`.

# Feedback and Support

For suggestions, issues, and/or support raise a GitHub issue!
