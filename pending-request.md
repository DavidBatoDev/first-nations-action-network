## Requests from Stephen

- [x] 1. There should be a subscribe button maybe something like what we propose for YACHATDAC. <https://actionnetwork.org/api/v2/forms/3f22a1a0-330f-473a-8a1c-aa5b6fd4a12f/>

- [x] 2. We can also have a survey section with links to petitions and surveys in same way. We don’t have any open surveys but we do have 2 open petitions. I can create a general survey form so we always have at least one open survey

- [x] 3. Please ensure we are not using the acronym of FNAN any where while we are still building our brand association.

- [x] 4. That being said we need a favicon

- [x] 5. "Book a conversation should go to a contact form". I can create this as an Action Network form so all details are captured in the Action Network CRM.

- [x] 6. This map should be a bit more reconisable as Australia, include some dots at top of Queensland where the Torres Strait Islands are, and show state - - - - - lines. We are in the process of establishing state networks so there should be the state bodies that stand out from the local groups. All the state bodies and local group pins should ideally link to their profiles in the directory.

---

## Outgoing requests — missing "Who We Are" (About) page info

The new /who-we-are page is built from the UX-Specifications doc, but several sections currently use draft copy or placeholders. Items to confirm with Steve:

- [x] 1. Vision & Purpose — the page uses draft statements I derived from the Brand Messaging Framework. Need the official, approved **vision statement** and **purpose statement** wording.

- [ ] 2. Our Story timeline — the six stages (Community Conversations → Local Gatherings → Partnerships Formed → Shared Learning → National Collaboration → The Network Today) use placeholder descriptions. Need the **real milestones/dates** and any **archival/community photos** for the timeline.

- [x] 3. What We Believe (3 cards) — confirm the final content for **01 Core Values**, **02 Strategic Approach**, and **03 Mottos**. Note: the spec listed "First Nations Ergonomic Independence", which I've rendered as "Economic Independence" — please confirm that's correct.

- [x] 4. Meet the People — currently placeholder profiles (generic photos, "Community Leader" names). Need **real names, roles, nation/community, short bios, and photos** (cleared for use with permission).

- [x] 5. Governance & Accountability (Section 7) — deferred as "for future update" per the spec. Confirm **if/when** it's wanted and which documents to link (Annual Reports, Strategic Plan, Governance Framework, Policies).

- [ ] 6. Imagery — hero, vision, story and people images currently reuse existing site photos as placeholders. Need **authentic, page-specific images**.

## Spec coverage gaps — Contribute / Learn / Directory (to scope with Stephen)

Cross-check of the UX-Specifications Contribute/Learn/Directory sections against the current site (home, /membership, /allyship, /training, /directory). Items below are NOT yet covered (or only partially) and need a decision on scope/placement.

### Contribute

- [x] Allyship Q&A — the four explainer questions are now live on `/allyship`
  (`#what-is-allyship`), **as draft copy pending consultant approval**. Full text
  and the open review questions are parked under "Allyship Q&A" in Actionable now.
- [ ] Newsletter sign-up — "Sign up to receive newsletter" (same as request #1; needs the Action Network form).
- [ ] Volunteer with Us — no pathway exists; decide where it lives (Contribute page/section).
- [ ] Become a Partner (Event / Publishing) — no partner pathway exists.
- [ ] Communities of practice — not mentioned anywhere; confirm if it should be a listed benefit.
- [ ] Benefit wording — confirm whether to use the spec's specific phrasing (unlimited emails, unrestricted events, syndicated communications to 10,000+, foundational in-person support, "affordable access fee contributing to working in solidarity"). Current site gestures at these but doesn't use that language.
- [ ] "Integrated campaign application / CRM" — spec lists it, but the Brand Messaging Framework says to AVOID "CRM". Confirm whether to reference it at all.
- [ ] Join the Network entry questions — add "Are you part of a local group?" / "Are you thinking of starting a group?" to the join flow.

### Learn

- [ ] Free vs Paid structure — /training is currently "book a conversation" only, with no free/paid tiers. Confirm if the service catalogue should be shown.
- [ ] Free tier — foundational group support, initial platform training, Do's & Don'ts.
- [ ] Paid: group incorporation process + group administration (online).
- [ ] Paid: brand development, website and social media presence / ongoing management.
- [ ] Paid: communication methods + campaign skills (face to face). (Cultural responsiveness & First Nations engagement are already covered.)
- [ ] Marketing & Branding Support — the section is **live on /learn as draft copy**. Need the partner's real name (it arrived truncated as "@~August Teleg"), the final list of services, and how the partnership should be credited on the page. Overlaps the brand-development item above; merge the two once confirmed.
- [ ] Learn page content — Stephen is conferring with a colleague and will send further changes once the 4 September 2026 round is live.

### Directory

- [ ] Category taxonomy conflict — the spec's directory categories are business/community listings (Arts, Festivals, Restaurants, Specialty Stores, Travel & Tourism, Community Groups [Native title / Allies / Environmental / Housing / Legal], Education, Languages, Health & Aged Care, Places of Worship, Embassies?). The current /directory (and IA v2) use organisation TYPES instead. Decide which taxonomy the directory uses before populating.
- [ ] Register form — add a directory registration form (currently absent; filters are disabled/"coming soon").
- [x] Mailing-list pop-up on the main page (ties into request #1) — built, see
  "Actionable now" below for the shipped behaviour.

## Actionable now (unblocked — working list)

Tasks we can progress without waiting on Stephen or a scope decision.

- [x] **Request #6 — rework the membership-page map.** Stephen was referring to
  the "National Directory" map on `/membership`. The current SVG is not really a
  map — it is an unrecognisable blob (AI slop) that does not resemble Australia.
  Rework it into a recognisable Australia: Torres Strait dots above Queensland,
  dashed state borders, and **state bodies visually distinct from local groups**
  (state networks are being established). Pins link to `/directory` as
  placeholders until published profiles exist, ready to swap in real profile
  URLs. Implementation details to be provided by the team later.
- [x] **Mailing-list pop-up** (spec Directory note; uses the request #1 subscribe
  form). Shipped as `src/components/NewsletterPopup.tsx`, rendered from
  `src/app/page.tsx` (homepage only). Behaviour as built:
  - Opens on whichever comes first: a 10s delay, 40% scroll, or exit intent
    (cursor leaving the top of the window — desktop pointers only). Deferred
    while the mobile nav drawer is open, retried 1.5s later.
  - CTA links out to `EXTERNAL_LINKS.subscribe` in a new tab. No API key or
    form handling in the browser.
  - Dismissible by close button, "Close", ESC and backdrop click. `role="dialog"`
    with `aria-modal`, focus moved to the close button, Tab trapped inside,
    focus returned to wherever it was, and the page scroll locked while open.
  - Fade only, no scale; the animation is dropped under
    `prefers-reduced-motion: reduce`.
  - Suppression state lives in `localStorage` under **`newsletter-popup-state`**
    as `{ status, at }`. `subscribed` (followed the link) and `suppressed`
    (reached a sign-up form) are permanent; `dismissed` lasts
    **`DISMISS_COOLDOWN_DAYS = 30`** (`src/lib/newsletter-popup.ts`).
    Clear that key to see the pop-up again while testing.
  - `src/components/NewsletterPopupSuppressor.tsx` writes `suppressed` on
    `/membership`, `/membership/apply` and `/contact`, so someone who has
    already reached a sign-up form is not prompted later on the homepage.
  - Copy avoids promising a cadence or content, because what that Action
    Network list actually sends has not been confirmed. **Ask Stephen** — if
    there is a stated cadence the copy can be sharpened.
  - Still to confirm with a real mouse: exit intent and backdrop click. OrcaCLI
    cannot deliver real wheel or pointer input to the page, so those were
    verified by dispatching the events their handlers listen for.
- [x] **Allyship Q&A** — drafted and live on `/allyship` as the
  `#what-is-allyship` section, using the same `<details>` accordion as the
  membership FAQ (`.faq-grid` / `.faq-item`). **This copy is DRAFT and needs
  First Nations consultant approval before it should be treated as published
  position.** The questions are the spec's own wording
  (`docs/UX-Specifications.md:191-195`).

  Draft copy as shipped:

  - Kicker "What is allyship?", heading "Where Allyship Begins.", lead:
    "Reconciliation and allyship get talked about often and explained rarely.
    These are the questions people ask most."

  - **What does reconciliation with First Nations peoples mean?**
    Reconciliation is the ongoing work of building honest, respectful
    relationships between First Nations peoples and the wider Australian
    community. It means telling the truth about this country's history,
    recognising the continuing strength of First Nations cultures and
    communities, and changing the conditions that still hold people back.
    Reconciliation is measured in relationships and outcomes, not in statements.

  - **How does it benefit non-Indigenous peoples?**
    Reconciliation is not something done for one group at another's expense. A
    community where everyone is heard, safe and able to influence the decisions
    that affect them is a stronger community for everyone in it. For
    non-Indigenous people it means a fuller understanding of the country they
    live in, relationships built on honesty rather than distance, and the chance
    to be part of repair rather than avoidance. Leaving this history unaddressed
    carries a cost that everyone shares.

  - **What does it mean to be an ally with First Nations peoples?**
    Being an ally means supporting First Nations peoples in the ways community
    asks to be supported. Allies walk alongside. They do not lead, and they do
    not speak on community's behalf. In practice that looks like learning before
    speaking, turning up consistently rather than only when an issue is in the
    news, and using whatever influence you have to make room for First Nations
    voices and decisions. It is a relationship, not a title.

  - **What are the core principles of being a good ally?**
    Listen first — take direction from community instead of assuming what is
    needed. Respect self-determination — support First Nations peoples to lead
    the decisions that shape their lives and communities. Keep learning — do
    your own reading and reflection rather than expecting others to teach you.
    Show up consistently — steady support over years matters more than attention
    in a moment. Stay accountable — accept correction without defensiveness, and
    keep going.

  Open questions for the consultant / Stephen:

  - [ ] The second question's premise. "How does it benefit non-Indigenous
    peoples?" invites a transactional answer. It is drafted as shared stake
    rather than personal gain, but the question itself may need rewording or
    removing.
  - [ ] Whether the Network should define reconciliation in its own words at all,
    or defer to an established definition.
  - [ ] Deliberate omissions to confirm: no mention of Voice, Treaty, Truth, the
    Uluru Statement, specific campaigns, or commemorative dates. Those are
    political positions needing explicit sign-off.
  - [ ] Terminology: the draft uses "First Nations peoples" throughout, matching
    the rest of the site. Confirm whether "Aboriginal and Torres Strait Islander
    peoples" should appear at least once.
  - [ ] **Duplication to resolve:** the fourth answer overlaps the existing
    "Allyship in practice" pillars on the same page (respectful relationships /
    learning and listening / meaningful action). Both are currently live.
    Recommendation: make the Q&A canonical and drop those three pillars, since
    five specific principles are more useful than three abstract ones.
- [ ] **Commit the accumulated work** — land Who We Are, Take Action, FNAN
  removal + icons, and the contact page in clean commits.
- [ ] **QA pass** — walk the new pages (Who We Are, Take Action, Contact) via
  OrcaCLI for visual, interaction and accessibility checks.

Note: other actionable items (Volunteer, Become a Partner, Learn free/paid
catalogue, Directory taxonomy/register form) remain listed under "Spec coverage
gaps" above and need a scope/content decision before build.

---

## Answered by Stephen (see `request-response.md`, 2026-09-02) — SHIPPED

- **Vision & Purpose** — official wording supplied and live on `/who-we-are`.
- **What We Believe** — Stephen replaced all three cards (Core Values,
  Strategic Approach, Mottos) with three action statements. **Confirm this was
  intended**: "replace 1, 2 and 3" was read literally, so the approved Core
  Values and Mottos are no longer on the page.
- **Our Team** — five named people live (Stephen Mam, Pablo Teleg, Suzanne
  Thompson, Sharon Wright, Peter Murchland). Photos are still placeholders and
  no bios were supplied.
- **Governance & Accountability** — dropped at Stephen's request. It was never
  built, so nothing was removed; the spec's Section 7 stays deferred.
- **Newsletter cadence** — confirmed as a monthly newsletter plus additional
  emails through the month; the pop-up copy now says so.
- Also shipped this round: "a federal network" on `/who-we-are`, the new "What
  is the Network" section, the new closing CTA heading, the homepage community
  directory highlight replacing the resources block, How We Work unified across
  both pages, and Events/Directory routing to their own pages.

### Still outstanding from Stephen

- [ ] Allyship Q&A — draft copy is live on `/allyship` and still needs First
  Nations consultant approval.
- [ ] Our Story timeline — real milestones and dates.
- [ ] Short bios and real photographs for the five team members.
- [ ] Authentic imagery for the hero and story sections.
- [ ] Whether the "What we believe" kicker should change, now that the three
  cards carry actions rather than values.
- [ ] Whether "federal" should replace "national" beyond `/who-we-are` (the
  homepage, footer, membership and `site.ts` still say national).
