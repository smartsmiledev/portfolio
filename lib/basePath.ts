/**
 * GitHub Pages serves this repository from /portfolio.
 * Vercel and local development serve it from the root.
 */
export const BASE_PATH =
  process.env.GITHUB_ACTIONS === "true" ? "/portfolio" : "";

/**
 * Prefix public asset paths when a base path is required.
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}