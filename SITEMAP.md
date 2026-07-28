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
├── /allyship — First Nations Allies introduction
├── /training — Training and Development service overview
└── /events — Public events hub
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
| Join the Network | `/membership` | Version 1 is an information and enquiry journey; Stripe Checkout is deferred. |
| Browse upcoming events | `/events` | The homepage “View Upcoming Events” action goes here. |
| Browse events from the navigation | `/#events` | Retains the homepage section behaviour; the Events navigation item also exposes a “View Upcoming Events” link to `/events`. |
| Browse the community directory and resources | `/#resources` | Homepage section until a dedicated directory or resource experience is built. |
| Contact or book a conversation | `/#contact` | Footer contact area. |
| Support or shop | `/#support` | Homepage section; no separate shop route yet. |

## Search-engine routes

- `/sitemap.xml` — generated from `src/app/sitemap.ts`; currently lists `/`, `/membership`, `/allyship`, `/training`, and `/events`.
- `/robots.txt` — generated from `src/app/robots.ts`; points crawlers to the XML sitemap.

## Planned or deferred routes

These are not standalone public pages in the current launch site:

- Community Directory
- Resource library
- Community Stories
- Shop and contribution flow
- Contact or booking form
- Login and member portal
- Member content submission

Their scope and sequencing are maintained in [ROADMAP.md](ROADMAP.md). Product
intent and future information architecture are described in
[Website Information Architecture v2](docs/Website%20Information%20Architecture%20v2.md).
