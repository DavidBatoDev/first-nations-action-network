# First Nations Action Network — Roadmap

This is the paste-ready source for the project roadmap in Proyekto. All tasks are assigned to Joshua. Completed items remain visible to show the work already done.

# Epic: Project foundations and Proyekto setup

## Feature: Existing foundations

### Tasks

- [x] Record Claude Design by Sir August as complete. — Assignee: Joshua
- [x] Record PRD completion. — Assignee: Joshua
- [x] Record supporting project documentation under docs/ as complete. — Assignee: Joshua
- [x] Record Vercel deployment of the updated Claude Design website as complete. — Assignee: Joshua

## Feature: Project overview organisation

### Tasks

- [x] Review the First Nations Action Network project overview in Proyekto. — Assignee: Joshua
- [x] Remove the misplaced folder from the Proyekto Overview section. — Assignee: Joshua
- [x] Add and describe each approved project resource link in Proyekto. — Assignee: Joshua
- [x] Add the project overview and roadmap as the source of truth for current status, decisions, and dependencies. — Assignee: Joshua
- [x] Keep the Proyekto roadmap updated as tasks move between planned, blocked, in progress, and complete. — Assignee: Joshua

# Epic: Core public website launch

## Feature: Existing public-site foundation

### Tasks

- [x] Record the existing homepage foundation as complete. — Assignee: Joshua
- [x] Record the existing homepage sections—Who We Are, Contribute, Learn, Events, and Directory/Resources—as complete. — Assignee: Joshua
- [x] Record the existing /membership page foundation as complete. — Assignee: Joshua
- [ ] Review the homepage against the approved design comments and replace or remove remaining placeholder content. — Assignee: Joshua
- [x] Verify all primary navigation links and homepage CTAs lead to a working destination. — Assignee: Joshua

## Feature: Membership information and conversion

### Tasks

- [x] Define distinct labels and destinations for public membership discovery and the “Apply to Join” action. — Assignee: Joshua
- [x] Build the Version 1 `/membership/apply` page and the unavailable, loading, error, and embedded-widget states without taking payment. — Assignee: Joshua
- [ ] Create the approved membership application in Action Network, configure its fields and consent, and add `ACTION_NETWORK_MEMBERSHIP_FORM_SLUG` to the deployment. **Blocked: Action Network form setup.** — Assignee: Joshua
- [ ] Define the internal handoff process for new membership enquiries and Steve's manual Action Network account provisioning. — Assignee: Joshua
- [ ] Update the membership page with confirmed content, A$150/month or A$1,200/year pricing, benefits, and the Version 1 application expectation; explain that Stripe Checkout will follow when payments are enabled. — Assignee: Joshua
- [ ] Verify the membership journey works from homepage CTA through successful form submission or enquiry handoff. — Assignee: Joshua

## Feature: Explore Allyship page

### Tasks

- [x] Prepare the page structure, reusable components, and documented brand/membership references that do not depend on final client content. — Assignee: Joshua
- [ ] Confirm the Explore Allyship destination, audience, purpose, and final content with Steve. **Blocked: Steve clarification meeting.** — Assignee: Joshua
- [ ] Build and link the Explore Allyship page using Steve-approved content. **Blocked: final content and destination.** — Assignee: Joshua
- [ ] Verify the homepage and navigation allyship CTAs direct to the completed page. — Assignee: Joshua

## Feature: Support the movement

### Tasks

- [x] Centralise the approved Action Network fundraiser and external merchandise-store URLs. — Assignee: Joshua
- [x] Link homepage, allyship, and footer support actions directly to the external destinations. — Assignee: Joshua
- [x] Convert `/donate` and `/shop` into compatibility redirects for existing links. — Assignee: Joshua
- [x] Keep donation transactions and merchandise checkout off-site; do not maintain local donation modals, carts, or checkout flows. — Assignee: Joshua

## Feature: Training & Development page

### Tasks

- [x] Build the standalone Training & Development page with documented public learning areas and a conversation CTA. — Assignee: Joshua
- [ ] Confirm final workshop packages, pricing, facilitator information, and booking process with Steve before publishing commercial detail. **Blocked: Steve clarification meeting.** — Assignee: Joshua

## Feature: Community Directory page

### Tasks

- [x] Build the public directory foundation with disabled discovery controls and an honest empty state. — Assignee: Joshua
- [ ] Collect approved seed organisations, public-listing permissions, and the publishing owner/process with Steve before publishing listings. **Blocked: Steve clarification meeting.** — Assignee: Joshua

## Feature: Community Stories Library

### Tasks

- [x] Build the public Community Stories Library foundation with disabled filters and an honest empty state. — Assignee: Joshua
- [ ] Collect approved initial stories, images, public-use permissions, publishing owner, and featured-story priorities with Steve before publishing content. **Blocked: Steve clarification meeting.** — Assignee: Joshua

## Feature: Resource Library

### Tasks

- [x] Build the public member-learning library preview with working search and resource-type filters. — Assignee: Joshua
- [x] Add the three provisional homepage resources as catalogue cards with course-style detail pages and lesson navigation. — Assignee: Joshua
- [ ] Confirm approved course catalogue, durations, materials, public-preview rules, and member-access requirements with Steve before publishing resources. **Blocked: Steve clarification meeting.** — Assignee: Joshua

## Feature: Upcoming Events page

### Tasks

- [x] Define the Version 1 Action Network event mapping, publishing rules, and optional `type:` and `format:` tag conventions. — Assignee: Joshua
- [x] Build the standalone Upcoming Events page with Events, Calendar, and Discover views, plus a clear “Join the Network” CTA. — Assignee: Joshua
- [x] Connect the homepage events CTA and “View Upcoming Events” action to the standalone events page. — Assignee: Joshua
- [x] Replace placeholder events with the read-only Action Network event feed and honest unavailable or empty states. — Assignee: Joshua
- [x] Keep the Action Network API key server-only and implement pagination, caching, rate-limit pacing, retries, and safe event-description mapping. — Assignee: Joshua
- [x] Link registration actions to each event's external Action Network page without creating people or attendance records on the FNAN website. — Assignee: Joshua
- [x] Show Events and Discover results newest-first while retaining chronological homepage and Calendar behaviour. — Assignee: Joshua
- [ ] Confirm Action Network event publishing ownership, required tags, and the ongoing operational process with Steve. **Blocked: Steve clarification meeting.** — Assignee: Joshua

## Feature: Core launch readiness

### Tasks

- [ ] Run responsive, accessibility, link, metadata, and production-build checks across all public pages. — Assignee: Joshua
- [ ] Confirm the canonical public domain and any required redirects or subdomain plan before launch. — Assignee: Joshua
- [ ] Confirm the Version 1 site excludes or clearly defers unfinished CRM, login, and payment features. — Assignee: Joshua
- [ ] Publish the completed public site once core pages and handoff processes are approved. — Assignee: Joshua

# Epic: Client alignment and content verification

## Feature: Steve clarification milestone

### Tasks

- [ ] Schedule the Steve clarification meeting. — Assignee: Joshua
- [ ] Hold the Steve clarification meeting. **Milestone: client decisions captured.** — Assignee: Joshua
- [ ] Confirm the Explore Allyship page destination, audience, content, and call to action. — Assignee: Joshua
- [ ] Confirm the membership application questions, membership wording, payment timing, and post-enquiry follow-up process. — Assignee: Joshua
- [ ] Confirm whether public membership materials should state the current access limits: one Captain, up to five Action Network users, and up to five Slack users per organisation. — Assignee: Joshua
- [ ] Confirm event sources, submission rules, approval owner, and publishing workflow. — Assignee: Joshua
- [ ] Request remaining client-provided copy, images, policies, partner links, and event information needed for launch. — Assignee: Joshua

## Feature: Content and product verification that can proceed now

### Tasks

- [ ] Review the documentation index and identify inconsistencies, stale content, and missing launch requirements. — Assignee: Joshua
- [ ] Inventory current pages, content availability, CTA destinations, and known gaps. — Assignee: Joshua
- [ ] Create a decision log for confirmed client choices and unresolved questions. — Assignee: Joshua
- [ ] Prepare membership-form fields and event-page content requirements for client review. — Assignee: Joshua

# Epic: Post-launch events publishing

## Feature: Automated event collection and approval

### Tasks

- [x] Use the FNAN Action Network group as the Version 1 source for public confirmed events. — Assignee: Joshua
- [ ] Research suitable external event sources and their permitted collection methods. — Assignee: Joshua
- [ ] Define event-ingestion fields, duplicate handling, and source attribution. — Assignee: Joshua
- [ ] Design the moderation workflow so collected events require approval before publication. — Assignee: Joshua
- [ ] Implement an internal review queue for collected events. — Assignee: Joshua
- [ ] Implement automated event ingestion and publishing of approved events to the public Upcoming Events page. — Assignee: Joshua
- [ ] Document the operational process for reviewing, correcting, expiring, and unpublishing events. — Assignee: Joshua

# Epic: Deferred membership platform

## Feature: Stripe membership payments

### Tasks

- [ ] Confirm access to the approved Stripe account and the responsible business owner. — Assignee: Joshua
- [ ] Create and approve the Stripe membership prices: A$150 monthly and A$1,200 annually. — Assignee: Joshua
- [ ] Define payment success, cancellation, failed-payment, refund, and renewal communication requirements. — Assignee: Joshua
- [ ] Implement Stripe Checkout after the membership application flow is approved. — Assignee: Joshua
- [ ] Connect successful payment to membership activation and the internal provisioning workflow. — Assignee: Joshua

## Feature: Member accounts and Action Network access

### Tasks

- [ ] Define organisation, Captain, and team-member account requirements. — Assignee: Joshua
- [ ] Build authentication and the member portal for learning materials, resources, events, and Action Network access. — Assignee: Joshua
- [ ] Implement the process for creating or provisioning member access in Action Network. — Assignee: Joshua
- [ ] Add a member-facing link or approved handoff into Action Network. — Assignee: Joshua
- [ ] Plan migration requirements for a future FNAN-owned CRM. — Assignee: Joshua

## Feature: Member content submissions and amplification

### Tasks

- [ ] Define submission fields and moderation requirements for stories, events, campaign updates, achievements, opinion pieces, and webinar recordings. — Assignee: Joshua
- [ ] Build member content-submission workflows for typed content and uploads. — Assignee: Joshua
- [ ] Build an internal approval and publishing workflow for member submissions. — Assignee: Joshua
- [ ] Define and implement approved-content amplification through the website and community email channels. — Assignee: Joshua
