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
│   ├── #membership — Membership overview
│   ├── #training — Learning and Development
│   ├── #allies — First Nations Allies / Explore Allyship
│   ├── #support — Contribute and support
│   ├── #stories — Community Stories
│   ├── #events — Events preview
│   ├── #resources — Directory and resources preview
│   ├── #join — Join the Network call to action
│   └── #contact — Contact and conversation links in the footer
├── /membership — Membership information and joining journey
│   └── /membership/apply — Version 1 organisation application and Action Network handoff
├── /allyship — First Nations Allies introduction
├── /donate — Compatibility redirect to the Action Network fundraiser
├── /shop — Compatibility redirect to the external merchandise store
├── /training — Training and Development service overview
├── /directory — Public Community Directory foundation
├── /stories — Public Community Stories Library foundation
├── /resources — Public member-learning library preview
└── /events — Public events hub powered by Action Network
    ├── Events — Upcoming and past event views
    ├── Calendar — Calendar view
    └── Discover — Public event discovery
```

## Navigation map

| Visitor intent | Current destination | Notes |
| --- | --- | --- |
| Understand FNAN | `/#who` | Homepage overview. |
| Learn how the network works | `/#how` | Homepage section. |
| Explore learning and development | `/training` | Public Training and Development overview; detailed packages and pricing remain to be confirmed. |
| Learn from the header | `/#training` | Retains the homepage-section behaviour. |
| Learn about First Nations Allies | `/allyship` | Provisional introduction using current homepage content; final message and CTA remain to be confirmed with Steve. |
| Explore allyship from the header | `/#allies` | Retains the homepage-section behaviour until the final allyship journey is approved. |
| Browse Community Stories | `/stories` | Public library foundation; approved stories are being prepared. |
| Explore resources | `/resources` | Public member-learning preview with three provisional homepage resources and non-indexed detail views; content requires approval. |
| Join the Network | `/membership` | Version 1 is an information and enquiry journey; Stripe Checkout is deferred. |
| Apply for membership | `/membership/apply` | Organisation application; shows an honest unavailable state until the approved Action Network widget is configured. |
| Browse upcoming events | `/events` | Public confirmed events are loaded from Action Network; registration remains on each Action Network event page. |
| Browse events from the navigation | `/#events` | Retains the homepage section behaviour; the Events navigation item also exposes a “View Upcoming Events” link to `/events`. |
| Browse the community directory and resources | `/directory` | Public directory foundation; approved listings are being populated. |
| Contact or book a conversation | `/#contact` | Footer contact area. |
| Support the movement | `/#support` | Homepage section linking directly to the external fundraiser and merchandise store. |
| Make a donation | External Action Network fundraiser | `/donate` remains available as a temporary compatibility redirect. |
| Shop merchandise | External Print Bar store | `/shop` remains available as a temporary compatibility redirect. |

## Search-engine routes

- `/sitemap.xml` — generated from `src/app/sitemap.ts`; currently lists `/`, `/membership`, `/membership/apply`, `/allyship`, `/training`, `/directory`, `/stories`, `/resources`, and `/events`. External fundraiser and merchandise destinations are not included.
- `/robots.txt` — generated from `src/app/robots.ts`; points crawlers to the XML sitemap.

## Planned or deferred routes

These are not standalone public pages in the current launch site:

- On-site shop checkout and donation payment processing
- Contact or booking form
- Login and member portal
- Member content submission

Their scope and sequencing are maintained in [ROADMAP.md](ROADMAP.md). Product
intent and future information architecture are described in
[Website Information Architecture v2](docs/Website%20Information%20Architecture%20v2.md).
