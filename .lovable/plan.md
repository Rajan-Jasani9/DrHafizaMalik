
# Dr. Hafiza Malik — Homeopathic Clinic Site

A calming, professional single-page site with two extra routes, lilac (no gradient, no blue/purple) theme, subtle animated "aura" background, and SEO-ready meta.

## Branding & theme
- Clinic name left as editable placeholder ("Hafiza Malik Homeopathy") in a single constants file for easy edit.
- Color system (HSL tokens in `index.css` + `tailwind.config.ts`): soft lilac primary, warm cream background, muted mauve accents, charcoal text. No gradients, no blue/purple.
- Typography (Google Fonts, loaded in `index.html`):
  - Headings: **Cormorant Garamond** (serif)
  - Body: **Lato** (sans)
  - Tuned line-height: headings ~1.15, body ~1.7, small text ~1.55; comfortable letter-spacing on display serif.

## Background animation
- Fixed, low-opacity SVG/CSS layer behind content: slow expanding lilac radial "aura" rings pulsing from 2–3 anchor points, very subtle (respecting `prefers-reduced-motion`).
- Non-interactive, `pointer-events-none`, won't distract from content.

## Routes
- `/` — single-page scroll landing
- `/case-studies` — dedicated page
- `/contact` — dedicated page
- Shared sticky top nav (smooth scroll to sections on `/`) + footer with social links.

## Landing page sections (scroll)
1. **Hero** — Two-column: left has headline, subheadline, two CTAs ("Book Consultation", "Our Specializations"); right reserves a clean cutout shot slot for Dr. Hafiza Malik (placeholder image + clear swap instructions in code).
2. **About Dr. Hafiza Malik** — Short bio, credentials, philosophy; trust badges (years of experience, patients treated).
3. **Specializations** — Two feature cards:
   - **Children with Autism** — gentle, individualized homeopathic support
   - **Women's Health** — hormonal, menstrual, prenatal & emotional wellness
4. **How It Works** — 3–4 step journey (Consult → Case Study → Remedy → Follow-up).
5. **Testimonials** — 3 short quotes (placeholder text to edit).
6. **Case Studies teaser** — 3 preview cards linking to `/case-studies`.
7. **FAQ** — accordion with common homeopathy questions.
8. **Contact CTA strip** — link to `/contact`.

## Case Studies page
- Grid of anonymized case cards: condition, age/gender, duration, summary, outcome.
- Filter chips: All / Autism / Women's Health.
- Seeded with 4–6 placeholder cases, easy to edit in a data file.

## Contact page
- Contact form (name, email, phone, topic, message) with toast confirmation (front-end only; wiring to email/DB can be added later).
- Clinic info block: address, hours, phone, email, WhatsApp.
- Embedded map placeholder.
- Social links pulled from the editable JSON.

## Editable content files
- `src/config/site.ts` — clinic name, tagline, doctor name, SEO defaults.
- `src/config/social.json` — you fill values:
  ```json
  {
    "instagram": "",
    "facebook": "",
    "youtube": "",
    "whatsapp": "",
    "email": "",
    "phone": "",
    "tiktok": "",
    "linkedin": ""
  }
  ```
  Empty keys are automatically hidden from the UI.
- `src/data/caseStudies.ts` — array of cases.
- `src/data/faq.ts` — Q&A list.

## SEO
- Per-page `<title>`, `<meta description>`, canonical, Open Graph & Twitter tags via `react-helmet-async`.
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, proper H1/H2 order).
- JSON-LD structured data: `MedicalBusiness` + `Physician` on home, `MedicalWebPage` on case studies, `ContactPage` on contact.
- `sitemap.xml` + updated `robots.txt`.
- Alt text placeholders on all images; descriptive link text.
- Updated `index.html` meta defaults and lang.

## Accessibility & polish
- Keyboard-friendly nav, focus rings in lilac, sufficient contrast.
- Reduced-motion support disables aura animation.
- Responsive from 360px up; mobile hamburger menu.

## Deliverable summary
A professional, SEO-optimized homeopathic clinic site in calming lilac with gentle aura background, Cormorant Garamond + Lato typography, dedicated doctor portrait slot, two specialization highlights, Case Studies and Contact pages, and editable JSON/TS config files for socials and content.
