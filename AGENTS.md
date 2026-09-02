<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project context

Before scoping or changing product content, read the [project documentation
index](docs/INDEX.md) and then the documents relevant to the task.

## Current implementation invariants

### Action Network

- Public events are loaded server-side through the read-only integration in
  `src/lib/action-network.ts`. Its detailed contract and rollout checklist live
  in `docs/action-network-api/fnan-integration.md`.
- Store the group API key only as `ACTION_NETWORK_API_KEY` in `.env.local` and
  the deployment environment. Never expose it through a `NEXT_PUBLIC_` variable,
  client component, browser request, log, or documentation.
- The public feed includes only confirmed, public, non-hidden events with the
  required Action Network fields. Registration remains on each event's external
  `browser_url`; the website does not create people or attendance records.
- Keep this integration GET-only unless a separately approved feature explicitly
  adds secure server-side writes. Stripe-to-Action-Network synchronisation is not
  part of the current implementation.
- The homepage shows the nearest upcoming events in chronological order. The
  Events and Discover lists show newest first; Calendar retains chronological
  date behaviour.
- `/contributors/apply` uses the separate
  `ACTION_NETWORK_MEMBERSHIP_FORM_SLUG` widget configuration documented in
  `docs/Action Network Membership Form Setup.md`. Do not substitute the API key
  for the public widget slug.
- `/contact` embeds the "Book a conversation" contact form via
  `ACTION_NETWORK_CONTACT_FORM_SLUG`, documented in
  `docs/Action Network Contact Form Setup.md`. Same public-widget-slug rules as
  membership; never use the API key. All "Book a conversation" /
  "Start the conversation" CTAs link to `/contact`, and both forms share the
  generic `ActionNetworkForm` component.
- The homepage mailing-list pop-up (`NewsletterPopup`) only links out to
  `EXTERNAL_LINKS.subscribe` in a new tab. Do not embed a form or collect
  addresses in it. Its once-per-visitor state lives in `localStorage` under
  `newsletter-popup-state`; the rules are in `src/lib/newsletter-popup.ts` and
  `NewsletterPopupSuppressor` marks visitors who already reached a sign-up form.

### Tests

- `npm test` runs Vitest. Only pure modules are covered so far
  (`src/lib/*.test.ts`); page and component behaviour is verified in the browser.

### Donations and merchandise

- Donation and shop destinations are external and are centralised in
  `src/lib/external-links.ts`. Support cards and footer links go directly to
  those destinations, while `/donate` and `/shop` are compatibility redirects.
- Do not restore local donation modals, transaction handling, product listings,
  carts, or checkout flows unless the product scope changes explicitly.
