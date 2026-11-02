# First Nations Action Network — Website Sitemap

This document records the current public website structure. It distinguishes
implemented pages from homepage sections and future routes so navigation and
content decisions remain clear during launch work.

The canonical public domain is still to be confirmed. The site also generates
a technical XML sitemap at `/sitemap.xml` for search engines.

## Current public structure

```text
/
├── Homepage sections
│   ├── #who — Who We Are
│   ├── #why — Why the Network
│   ├── #how — How It Works
│   ├── #contributors — Contributors overview
│   ├── #learn — Learning and Development
│   ├── #allies — First Nations Allies preview (Explore Allyship links to /allyship)
│   ├── #support — Contribute and support
│   ├── #stories — Community Stories
│   ├── #events — Events preview
│   ├── #directory — Community directory highlight (state-network map)
│   ├── #join — Join the Network call to action
│   └── #contact — Contact and conversation links in the footer
├── /contact — "Book a conversation" contact form (Action Network widget)
├── /contributors — Contributor information and joining journey
│   └── /contributors/apply — Version 1 organisation application and Action Network handoff
├── /allyship — First Nations Allies introduction
├── /donate — Compatibility redirect to the Action Network fundraiser
├── /shop — Compatibility redirect to the external merchandise store
├── /training — Compatibility redirect to /learn (permanent, 308)
├── /membership — Compatibility redirect to /contributors (permanent, 308)
│   └── /membership/apply — Compatibility redirect to /contributors/apply (permanent, 308)
├── /learn — Learning and Development service overview
├── /directory — Public Community Directory foundation
├── /stories — Searchable Community Stories Library with editorial entry rows
│   └── /stories/[slug] — Five published articles with matching images and references
├── /resources — Public contributor-learning library preview
└── /events — Public events hub powered by Action Network
    ├── Events — Upcoming and past event views
    ├── Calendar — Calendar view
    └── Discover — Public event discovery
```

### Homepage media and organisation carousel

- Hero and Contributors use silent, full-length VP9 WebM loops with WebP
  posters; reduced-motion visitors see the still posters. At widths up to 980px,
  the homepage hero fills the content width in a 4:5 cover-cropped frame capped
  at 640px tall. Desktop retains its existing cover crop.
- Who We Are uses `/images/who-we-are.webp`; the homepage Allies preview uses
  `/images/allies-home.webp`. Shared `/images/allies.webp` and
  `/images/membership.webp` remain unchanged on other pages and team entries.
- At widths up to 1024px, Who We Are stacks its content above the image.
  Larger screens retain the side-by-side layout.
- Organisation carousel arrows sit centred below the logo strip, with
  borderless grey glyphs, 56×44px targets and visible keyboard focus. Manual
  navigation remains available with reduced motion.
- The Community Stories quote band features Megan Davis, Director of the
  Indigenous Law Centre, UNSW, with context from her National Allyship Summit
  address and her call for active, shared democratic reform. A muted introduction
  sits 24px above the quotation, which scales from 20px on mobile to 24px on desktop.
- The learning slideshow decodes requested photographs before an 850ms
  directional overlap, keeping the outgoing photograph opaque. Manual controls
  remain available under reduced motion, without autoplay.
- Homepage story cards feature the reform (Wellbeing), allyship summit
  (Governance) and Djab Wurrung Birthing Trees (Country) articles, in that order.
  Cards link directly to their detail pages; UNPFII remains in the full library.

### Stories library and article publishing

- `/stories` searches article prose and metadata and combines category,
  subcategory and region filters. URL parameters `q`, `category`, `subcategory`
  and `region` preserve selections on reload and browser back/forward.
- The supplied five-category, twenty-subcategory taxonomy drives the controls.
  Organisation and Topic remain searchable without separate dropdowns.
- All five current articles belong to First Nations Action Network. Their
  source organisations remain in prose/references; no publication dates or
  individual author credits are invented.
- Article content and featured order live in `src/lib/stories.ts`; schema and
  writing styles are in `src/lib/story-types.ts` and `src/styles/stories.css`.
  Uploaded DOCX and image sources are retained in `new_assets/Articles/`.

## Navigation map

| Visitor intent | Current destination | Notes |
| --- | --- | --- |
| Understand FNAN | `/#who` | Homepage overview. |
| Learn how the network works | `/#how` | Homepage section. |
| Explore learning and development | `/learn` | Public Learning and Development overview; detailed packages and pricing remain to be confirmed. |
| Learn from the header | `/learn` | The Learn navigation item opens the Learning and Development page; the homepage keeps its `#learn` preview section. |
| Learn about First Nations Allies | `/allyship` | Provisional introduction using current homepage content; final message and CTA remain to be confirmed with Steve. |
| Explore allyship from the header | `/allyship` | Steven approved the allyship journey; every Explore Allyship button now opens the page. The homepage keeps its `#allies` preview section. |
| Browse Community Stories | `/stories` | Five published articles with search, category/subcategory/region filters and linked detail pages. |
| Explore resources | `/resources` | Public contributor-learning preview with three provisional homepage resources and non-indexed detail views; content requires approval. |
| Join the Network | `/contributors` | Version 1 is an information and enquiry journey; Stripe Checkout is deferred. |
| Apply to contribute | `/contributors/apply` | Organisation application; shows an honest unavailable state until the approved Action Network widget is configured. |
| Browse upcoming events | `/events` | Public confirmed events are loaded from Action Network; registration remains on each Action Network event page. |
| Browse events from the navigation | `/events` | The Events navigation item opens the Events page directly; the homepage keeps its `#events` preview section. |
| Browse the community directory and resources | `/directory` | Public directory foundation; approved listings are being populated. The Directory navigation item opens this page, and the homepage `#directory` section highlights it. |
| Contact or book a conversation | `/contact` | Embedded Action Network contact form; shows an honest unavailable state until `ACTION_NETWORK_CONTACT_FORM_SLUG` is configured. Every "Book a conversation" and "Start the conversation" CTA links here. The footer `#contact` area remains. |
| Support the movement | `/#support` | Homepage section linking directly to the external fundraiser and merchandise store. |
| Make a donation | External Action Network fundraiser | `/donate` remains available as a temporary compatibility redirect. |
| Shop merchandise | External Print Bar store | `/shop` remains available as a temporary compatibility redirect. |
| Reach the old training URL | `/learn` | `/training` permanently redirects after the rename and is not listed in `sitemap.xml`. |
| Reach the old membership URLs | `/contributors` | `/membership` and `/membership/apply` permanently redirect after the rename; neither is listed in `sitemap.xml`. |

## Search-engine routes

- `/sitemap.xml` — generated from `src/app/sitemap.ts`; currently lists `/`, `/who-we-are`, `/contact`, `/contributors`, `/contributors/apply`, `/events`, `/allyship`, `/learn`, `/directory`, `/stories`, all five `/stories/[slug]` articles, and `/resources`, plus the utility and policy pages registered in `src/lib/site-pages.ts`. External fundraiser and merchandise destinations are not included.
- `/robots.txt` — generated from `src/app/robots.ts`; points crawlers to the XML sitemap.

## Not-found and error states

- Any URL that matches no route renders `src/app/not-found.tsx` with a 404
  status. The page keeps the site's navigation and footer, leads with a
  **Return home** button, and lists the main destinations; it does not redirect
  automatically, so a mistyped or out-of-date link stays visible in the address
  bar. It is marked `noindex, nofollow` and is not listed in `sitemap.xml`.
  The same page is shown wherever a route calls `notFound()`, including an
  unknown `/resources/[slug]` or `/stories/[slug]`.
- A runtime error inside a route renders `src/app/error.tsx`, which offers
  **Try again** and **Return home**. It shows only the error digest, never the
  error message.
- `src/app/global-error.tsx` covers the rarer case of the root layout itself
  failing. It replaces the layout, so it renders its own document and is styled
  inline rather than through `globals.css`.

## Planned or deferred routes

These are not standalone public pages in the current launch site:

- On-site shop checkout and donation payment processing
- Login and member portal
- Member content submission

Their scope and sequencing are maintained in [ROADMAP.md](ROADMAP.md). Product
intent and future information architecture are described in
[Website Information Architecture v2](docs/Website%20Information%20Architecture%20v2.md).
