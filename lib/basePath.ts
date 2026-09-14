/** Sub-path the site is served from on GitHub Pages; empty in dev. Also read by next.config.ts. */
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/test-portfolio" : "";

/**
 * Prefixes a public/ path with the basePath. Next only applies basePath to
 * next/link and the image optimizer, so plain <img>, <a> and unoptimized
 * next/image sources need it added manually.
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
