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
│   ├── What is the Network — network statement, between the logo carousel and #who
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
├── /who-we-are — Introduction, vision, story and interactive team profiles
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
  `/images/membership.webp` remain unchanged on other pages.
- At widths up to 1024px, Who We Are stacks its content above the image.
  Larger screens retain the side-by-side layout.
- The organisation carousel appears only on the homepage. On mobile, the
  active logo is centred in the viewport during initial display, navigation,
  autoplay and resizing. Arrows sit centred below the strip, with borderless
  grey glyphs, 56×44px targets and visible keyboard focus. Autoplay holds each
  logo for 3 seconds and pauses only while a mouse is over the logo strip, the
  carousel is off screen, or the tab is hidden; touch never pauses it. Manual
  navigation remains available with reduced motion, which disables autoplay.
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

### Shared opening and closing waves

- `OpeningWave` matches the adjoining sections: `fromColor` follows the hero
  or homepage logo band, while `toColor` follows the content below. Its crest
  and droplets share the hero colour; the divider never includes logos.
- Who We Are and Learning use the shared eggshell ground (`--eggshell`) above
  their opening waves. Learning uses dark text and the solid light navigation.
- Other wave-topped dark heroes use solid backgrounds so a gradient edge
  cannot create a visible seam. The homepage hero retains its original styling.
- The homepage carousel includes its own `OpeningWave`; the homepage does not
  add a second standalone opening divider. Other pages use the wave alone.
- `SectionWave` is the reusable light-to-dark closing transition. Its
  `fromColor` and `toColor` match the adjoining sections; the scroll-driven
  shape and droplets reuse `AnimatedWave` and remain still with reduced motion.
- `.sec.final.has-wave` keeps zero top padding above the closing wave even
  when responsive section-padding rules apply; the wave owns that spacing.
- Home, Who We Are and Contributors place the wave inside their existing dark
  closing CTA and set `Footer`'s `showWave={false}` to avoid a second divider.
  Other pages use the footer's default wave; `waveFrom` matches their final
  content background. No new CTA content or destinations are introduced.
- The homepage and Contributors carry the "What is the Network" statement
  (`NetworkWelcome`); Who We Are no longer repeats it. On the homepage it sits
  on cream directly below the logo carousel, whose wave fills cream into it, so
  the white Who We Are section that follows stays visually separate.
  Organisation carousels are not part of other pages or shared content.
- Public landing, library, article, lesson, form and policy routes share the
  opening and closing waves. Redirect-only routes and the unlinked 3D-map prototype are unchanged.


### Hero height

- Every page hero (`.hero`, `.events-hero`, `.application-hero`, `.doc-hero`,
  Who We Are's `.who-intro` and Allyship's `.allies`) has `min-height: 100svh`
  and centres its content, so all heroes match the viewport height. They use
  the same top padding (152px, 128px on desktop windows up to 820px tall) so
  the gap under the fixed navigation is the same everywhere.
- Desktop hero media height follows `--hero-media-h`
  (`clamp(320px, 100svh - 300px, 560px)`) so the content fits shorter windows.
- A hero whose text and media are taller than the viewport (mobile stacks, or
  desktop windows under about 700px tall) grows to fit its content rather than
  clipping it.

### Who We Are media and team profiles

- `/who-we-are` opens with seven supplied community photographs, converted to
  WebP in `public/images/who-we-are/carousel/`. It reuses the decoded-image
  slideshow with a three-second hold per photo, photo buttons and left/right
  arrow-key navigation. Autoplay
  pauses on hover, keyboard focus, leaving the viewport, or a hidden browser tab;
  reduced motion disables autoplay and the sliding transition.
- Vision and Purpose reuse the homepage's `/videos/hero.webm` silent loop and
  `/images/hero.webp` poster. Reduced-motion visitors see the poster.
- Five team profiles use the supplied portraits and biographies. Cards turn on
  mouse hover. Read story and Back to portrait controls live on their respective
  rotating faces, so labels, icons and hit areas follow the animation. Only the
  active face accepts pointer or keyboard interaction; focus transfers between
  its controls. Touch, Enter and Space are supported. Escape, focus exit or
  mouse exit restores the portrait. Reduced motion swaps faces without rotation
  or losing focus. Hidden faces are excluded from assistive technology, and
  card height grows to fit the biography.
- Converted photographs live in `public/images/who-we-are/`; unused supplied
  reference photographs are converted under its `references/` directory.


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
