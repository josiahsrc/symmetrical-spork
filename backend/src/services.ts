import { getValue, putValue } from "./database";
import { ClientError, NotFoundError } from "./error";
import { isValidHttpUrl } from "./utils";

export type CreateSlugInput = {
  url: string;
}

export type CreateSlugOutput = {
  slug: string;
}

/**
 * Creates a slug for a given URL.
 * @param input The URL to create a slug for
 * @returns The slug
 */
export const createSlug = (input: CreateSlugInput) => {
  const url = input?.url;
  if (!url) {
    throw new ClientError("url is required");
  }

  if (typeof url !== "string") {
    throw new ClientError("url must be a string");
  }

  const validUrl = isValidHttpUrl(url);
  if (!validUrl) {
    throw new ClientError("must be a valid http or https url");
  }

  const slug = putValue(url);
  return { slug };
}

export type GetUrlOutput = {
  url: string;
}

/**
 * Gets the URL for a given slug.
 * @param slug The slug to get the URL for
 * @returns The URL
 */
export const getUrl = (slug: unknown) => {
  if (typeof slug !== "string") {
    throw new ClientError("slug must be a string");
  }

  const url = getValue(slug);
  if (!url) {
    throw new NotFoundError("slug not found");
  }

  return { url };
}