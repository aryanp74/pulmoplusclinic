# Publication readiness - checklist

## Phase 1 (Approved): Security-safe forms + core publication fixes
- [x] Phase 1a: Update `src/pages/book-appointment.astro` to remove Formspree placeholder endpoint and operate in WhatsApp/call-only (optional Google Form callback request)
- [x] Phase 1b: Update `src/pages/upload-reports.astro` to remove Formspree placeholder endpoint and operate in WhatsApp/call-only (optional Google Form callback request)
- [x] Phase 1c: Add clear UI messaging so users know how the site will submit requests (WhatsApp/call fallback)

## Phase 2 (Next): Real content + media
- [ ] Phase 2a: Update `src/pages/about.astro` to use the provided doctor + clinic exterior images
- [ ] Phase 2b: Update `src/data/testimonials.ts` with the approved real testimonials
- [x] Phase 2c: Confirm clinic hours text is consistent across pages

## Phase 3: Production build + QA
- [x] Run `npm run build` and fix any build errors
- [x] Spot-check forms, links, and images in the generated static output
