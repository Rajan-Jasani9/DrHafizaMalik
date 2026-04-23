# Hafiza Malik Homeopathy

Marketing site for **Hafiza Malik Homeopathy** — classical, individualized homeopathic care, with a focus on pediatrics (including children with autism) and women’s health. The app is a static React SPA: a rich home page and a case studies page, with client-side SEO metadata and structured data.

## Tech stack

- **Build:** [Vite](https://vitejs.dev/) 5, [React](https://react.dev/) 18, [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- **Routing & data:** [React Router](https://reactrouter.com/) v6, [TanStack Query](https://tanstack.com/query)
- **Testing:** [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/)
- **Quality:** ESLint 9, TypeScript ESLint

## Prerequisites

- **Node.js** 20.x or 18.x (LTS) and npm (or pnpm/yarn if you prefer — examples use npm)

## Install and run

```bash
npm install
npm run dev
```

The dev server listens on **port 8080** by default (see `vite.config.ts`).

| Script | Description |
|--------|---------------|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |

## Routes

- `/` — Home (hero, specializations, FAQ, contact section, etc.)
- `/case-studies` — Case studies
- `/contact` — Redirects to `/` and scrolls to the **contact** section
- `*` — 404

## Configuring the site

Most clinic-facing copy and SEO are centralized so you can change them in one place:

- **`src/config/site.ts`** — Practice name, doctor details, address, hours, stats, and default SEO `title` / `description` / URL.
- **`src/config/social.json`** — Social links, email, phone, and WhatsApp.
- **`src/data/faq.ts`** — FAQ content.
- **`src/data/caseStudies.ts`** — Case study cards and copy.

The contact form on the home page currently shows a success toast after a short delay; it does not submit to a server. For production, wire it to your API, email service, or form provider.

## Development notes

- Path alias: `@/*` → `src/*` (see `vite.config.ts` and `tsconfig`).
- In development, the [Lovable](https://lovable.dev/) `componentTagger` plugin is enabled; it is not required for a normal build.

## License

Private project; all rights reserved unless you add an explicit open-source license.
