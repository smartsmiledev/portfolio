# Portfolio

Personal portfolio site — dark theme with gold accents, built as a static export.

## Stack

- Next.js 16 (App Router) with Turbopack
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion for scroll and entrance animations
- EmailJS for the contact form

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Build

```bash
npm run build
```

`output: "export"` in [next.config.ts](next.config.ts) writes a fully static site to `out/`,
so it can be hosted on GitHub Pages, Vercel, Netlify, or any CDN without a Node server.

## Configuration

Content lives in [data/](data/) — edit these instead of touching components:

| File | Contents |
| --- | --- |
| `profile.ts` | Name, role, bio, stats, social links |
| `skills.ts` | Skill categories with levels, orbit labels |
| `projects.ts` | Project cards |
| `experience.ts` | Work history timeline |
| `education.ts` | Education timeline |

### Contact form

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Without them the form falls back to opening the visitor's mail client via `mailto:`.

### Assets

Place `avatar.jpg` and `cv.pdf` in `public/`, and project screenshots in `public/projects/`.
If the avatar is missing, the hero renders the initials instead; projects without a screenshot
fall back to a placeholder. The name the CV is saved as comes from `cvFileName` in `profile.ts`.

Public paths are written without a prefix (`/cv.pdf`) and passed through `asset()` from
[lib/basePath.ts](lib/basePath.ts), which adds the GitHub Pages sub-path in production —
Next only applies `basePath` automatically to `next/link`, not to `<img>`, `<a>`, or
unoptimized `next/image` sources.
