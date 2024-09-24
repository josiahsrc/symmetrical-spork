import { describe, expect, test } from '@jest/globals';
import { isValidHttpUrl } from './utils';

describe('isValidHttpUrl', () => {
  test('should work', () => {
    expect(isValidHttpUrl('http://example.com')).toBe(true);
    expect(isValidHttpUrl('https://example.com')).toBe(true);
    expect(isValidHttpUrl('ftp://example.com')).toBe(false);
  });
});
