/**
 * Formats a slug as a link that can be visited. The link will
 * redirect you to the expanded url.
 */
export const formatSlug = (slug: string) => {
  return `${window.location.origin}/${slug}`;
}
