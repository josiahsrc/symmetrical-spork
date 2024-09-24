import { nanoid } from "nanoid"

const lookup: Record<string, string> = {}

/**
 * Generates a new slug and stores the value at that slug's
 * location. Fetch the value later using the slug.
 * 
 * ~1 thousand years or 9B IDs needed in order to have a 1%
 * probability of at least one collision if you were generating
 * 1000 ids per hour.
 * 
 * https://zelark.github.io/nano-id-cc/
 * 
 * @param value The value to store
 * @returns The generated slug
 */
export const putValue = (value: string): string => {
  const slug = nanoid(12);
  lookup[slug] = value;
  return slug;
}

/**
 * Fetches the value stored at the given slug.
 * 
 * @param slug The slug to fetch
 * @returns The value stored at the slug
 */
export const getValue = (slug: string): string | undefined => {
  return lookup[slug];
}
