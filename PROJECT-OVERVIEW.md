# First Nations Action Network — Project Overview

## Project purpose

First Nations Action Network (FNAN) is an Australian nonprofit network led by Stephen (Steve). It connects First Nations organisations, ally organisations, community groups, advocates, and other groups working to strengthen communities.

The website is the public entry point to the network. Its immediate purpose is to explain the network, build trust, help suitable organisations start a membership conversation, and make FNAN's learning, events, and community work visible.

## Objectives

1. Grow the network by helping organisations understand membership and take a clear next step.
2. Showcase FNAN's community-led work, members, learning opportunities, and events across Australia.
3. Give members access to training and resources, then support their use of Action Network.
4. Create future pathways for members to submit stories, event announcements, campaign updates, community achievements, opinion pieces, and webinar recordings.
5. Publish a complete, trustworthy Version 1 website without waiting for the member portal, CRM, or automated payment flow.

## Audience

- First Nations organisations and community-led initiatives.
- Ally organisations and workplace ally networks; allies are supporters who are not necessarily First Nations or Aboriginal people.
- Reconciliation, advocacy, cultural, community, and social-enterprise groups across Australia.
- Organisations seeking connections, practical community-organising tools, training, resources, visibility, and collaboration opportunities.

## Membership context

Network Membership is organisation-based, rather than an individual software subscription. The documented investment is $1,200 annually or $150 monthly. Membership is intended to provide:

- Access to the national network and collaboration opportunities.
- Access to community-organising infrastructure, currently including Action Network and Action Builder.
- Learning materials, resources, onboarding, and platform training.
- Enhanced community-directory visibility.
- Opportunities to share approved stories, events, and initiatives.

The intended long-term journey is membership application → payment → account creation → onboarding → participation. Steve has confirmed that FNAN has a Stripe account, but membership-payment products and the application setup are not yet configured. The Version 1 launch should therefore collect membership interest/information first; Stripe checkout, member accounts, and login remain deferred.

## Current website state

The site has been created from the Claude design and deployed to Vercel. Its homepage currently includes sections for Who We Are, Contribute, Learn, Events, and Directory/Resources. A membership page exists, but the membership information-collection flow is not complete.

The core launch gaps are a clear membership journey, an Explore Allyship page, and a standalone Upcoming Events page. The homepage's events section should lead to that standalone page. Event scraping, moderation tooling, member submission workflows, the member portal, CRM, login, and Stripe payment integration are later phases.

## Key decisions and constraints

- Complete core public pages and publish the site before CRM or login work.
- Use a simple membership information/contact form for the first release.
- Keep the external Action Network service as the current organising tool; building a replacement CRM is future work.
- Build the standalone events page for launch. Automated event collection must be reviewed and approved before publishing, and is post-launch work.
- A meeting with Steve is required to confirm Allyship content and destination, membership messaging and application expectations, event sources and approval ownership, and other page-content gaps.
- Do not make the Steve meeting a blocker for independent launch work such as the project overview, roadmap, events-page foundation, and membership-form preparation.

## Reference material

Start with the [documentation index](docs/INDEX.md). The most relevant sources for the current roadmap are:

- [Website Information Architecture v2](docs/Website%20Information%20Architecture%20v2.md)
- [Membership Page Messaging Architecture v3](docs/Membership%20Page%20Messaging%20Architecture%20v3.md)
- [Membership User Flow Blueprint v2](docs/Membership%20User%20Flow%20Blueprint%20v2.md)
- [Onboarding meeting notes](docs/onboard-meeting-notes.md)
- [Onboarding meeting transcript](docs/onboard-meeting-transcript.md)

## Project ownership

- Client and product lead: Stephen (Steve)
- Project/team lead: August Teleg
- Assignee for current roadmap work: Joshua
