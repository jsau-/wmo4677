import { expect, test } from 'vitest';
import { codes } from './codes.mjs';
import { metadata } from './metadata.mjs';

test('all codes and keys match', () => {
  const codeNumbers = Object.keys(metadata).map((x) =>
    parseInt(x, 10)
  ) as (keyof typeof metadata)[];

  expect.assertions(codeNumbers.length * 2);

  for (const codeNumber of codeNumbers) {
    expect(metadata[codeNumber].code).toBe(codeNumber);
    expect(codes[metadata[codeNumber].key]).toBe(codeNumber);
  }
});
