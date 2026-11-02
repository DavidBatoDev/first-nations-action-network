# **FIRST NATIONS ACTION NETWORK**

# **Content & Amplification Blueprint v1**

## **Purpose**

This document defines how stories, events, campaigns, community updates and member-generated content are collected, published, amplified and distributed throughout the First Nations Action Network.

The objective is to help participating organisations increase visibility, strengthen engagement and reach wider audiences through a shared content ecosystem.

This blueprint forms the foundation for:

-   Membership benefits
-   Story submissions
-   Event promotion
-   Community engagement
-   Newsletter syndication
-   Directory visibility
-   Future member portal functionality

## Current public website implementation

The public stories library now publishes the five supplied articles at
`/stories` and `/stories/[slug]`. The submission, portal and syndication flows
described below remain future product architecture; publishing these articles
does not introduce a CMS, accounts or automated submissions.

### Article ownership and metadata

- All five current articles explicitly use **First Nations Action Network** as
  their Organisation, overriding the source DOCX Organisation fields. This is
  an assignment for these records, not a universal default for future articles.
- Organisations mentioned in prose and references remain intact. Organisation
  ownership is not an individual author credit.
- Publication dates and authors are omitted when the source does not establish
  them. File timestamps and dates mentioned inside an article are not publishing
  dates.
- Categories follow the supplied documents. Approved editorial subcategories
  are Justice (reform), Leadership (allyship summit), Policy (UNPFII), Heritage
  (Djab Wurrung) and Treaty (state and territory treaties).
- Region arrays retain the supplied Federal, state/territory and Global
  coverage. Global does not automatically match Australian regional filters.

### Authoring and writing styles

- `src/lib/stories.ts` is the canonical typed article collection; DOCX files are
  editorial sources, not parsed at runtime. `src/lib/story-types.ts` defines
  metadata and body blocks. The source uploads remain in `new_assets/Articles/`.
- Use semantic paragraphs, h2/h3 sections beneath the page h1, nested lists,
  inline emphasis/links, callouts, quotations, figures and accessible tables.
  Preserve source prose and references rather than pasting arbitrary HTML or
  ASCII diagrams into the reading view.
- `src/styles/stories.css` establishes Merriweather headings, Inter body text,
  a reading column up to 68ch, 18px desktop prose and 16.5px mobile prose with
  generous line spacing. Links are underlined, tables scroll inside their own
  keyboard-focusable region, and callouts use restrained ochre accents.
- Article WebPs are capped at 1600px wide without upscaling; separate thumbnails
  are capped at 640px. Preserve image dimensions and meaningful detail-page alt
  text, and preload only the article hero on its own page.
- The Djab Wurrung hero and thumbnail use matching bottom-aligned 16:9 crops,
  retaining the banner without beige side-fill. Changed crops use new filenames
  to refresh optimized-image and browser caches; source uploads stay untouched.
- `featuredOrder` selects the homepage's three real article cards. The library
  uses curated collection order because publication dates are not supplied.

### Discovery controls

The row-style library exposes search, Category, Subcategory and Region controls
without repeated visible labels; each retains an accessible name. Search covers
full prose and metadata, including Organisation and Topic. Selections combine
with AND, dependent subcategories reset when incompatible, and clear/no-results
states are available. URL parameters preserve search/filter selections.

The taxonomy in `src/lib/story-filters.ts` follows `Subcategories List.docx`:
Governance (Treaty, Title, Policy, Leadership), Country (Rangers, Heritage,
Sustainability, Conservation), Wellbeing (Health, Justice, Housing, Healing),
Enterprise (Business, Training, Procurement, Employment), and Culture (Arts,
Histories, Elders, Events).

# **Vision**

## **A National Content Network For Community-Led Stories, Events And Action**

Many organisations are doing important work.

Unfortunately, much of that work remains invisible outside their immediate community.

The First Nations Action Network exists to help organisations share, amplify and celebrate community-led initiatives across Australia.

The network creates opportunities for organisations to learn from one another, support one another and increase the visibility of positive community action.

# **Core Principle**

## **Content Should Flow Through The Network**

The objective is not simply to publish content.

The objective is to help content move.

Stories should be discovered.

Events should be promoted.

Campaigns should be amplified.

Communities should learn from one another.

# **Content Ecosystem**

The content ecosystem consists of five primary content types.

## **Community Stories**

Examples:

-   Community achievements
-   Success stories
-   Local initiatives
-   Community projects
-   Cultural activities
-   Community development programs

Purpose:

Share positive community outcomes.

## **Opinion & Thought Leadership**

Examples:

-   Community perspectives
-   Opinion pieces
-   Leadership reflections
-   Advocacy commentary
-   Truth-telling initiatives

Purpose:

Support discussion and learning.

## **Events**

Examples:

-   Forums
-   Gatherings
-   Workshops
-   Conferences
-   Community celebrations
-   Webinars

Purpose:

Increase participation and attendance.

## **Campaigns**

Examples:

-   Community campaigns
-   Advocacy initiatives
-   Awareness campaigns
-   Volunteer drives
-   Community action projects

Purpose:

Increase engagement and support.

## **Resources**

Examples:

-   Guides
-   Toolkits
-   Templates
-   Educational content
-   Training materials

Purpose:

Strengthen organisational capacity.

# **Content Submission Workflow**

## **Step 1**

Member Creates Content

Content may include:

-   Story
-   Event
-   Campaign
-   Resource

## **Step 2**

Submission

Content submitted through:

Member Portal

↓

Submission Form

## **Step 3**

Review

Network team reviews:

-   Quality
-   Accuracy
-   Relevance
-   Brand alignment

## **Step 4**

Editing

Content may be:

-   Approved
-   Edited
-   Returned for revision

## **Step 5**

Publishing

Published to:

First Nations Action Network website

## **Step 6**

Amplification

Content becomes available for broader distribution throughout the network.

# **Amplification System**

This is one of the core membership benefits.

The network helps organisations extend the reach of their content.

## **Amplification Channels**

### **Website**

Published content appears on the public website.

### **Community Stories Library**

Content becomes part of a growing collection of community stories.

### **Community Directory**

Relevant content may appear alongside organisation profiles.

### **Newsletter Content Library**

Approved content becomes available as reusable newsletter content.

### **Social Content Library**

Approved content becomes available as reusable social content.

### **Future Network Distribution Channels**

Additional distribution opportunities may be added over time.

# **Content Reuse Model**

Published content becomes part of the broader ecosystem.

## **Example**

Organisation:

YACHATDAC

↓

Publishes Story

↓

Story Approved

↓

Published On Website

↓

Appears In Community Stories Library

↓

Newsletter Snippet Created

↓

Other Organisations May Share Story

↓

Community Reach Increases

# **Newsletter Snippet System**

The Newsletter Snippet System provides members with ready-to-use content.

## **Story Snippet**

Includes:

-   Headline
-   Summary
-   Link to article

## **Event Snippet**

Includes:

-   Event details
-   Event description
-   Registration link

## **Campaign Snippet**

Includes:

-   Campaign summary
-   Participation instructions
-   Link

## **Purpose**

Reduce content creation workload while increasing visibility.

# **Community Stories Library**

The Community Stories Library becomes a central knowledge-sharing resource.

## **Objectives**

Showcase positive action.

Highlight community leadership.

Promote innovation.

Encourage collaboration.

Build inspiration.

## **Search Options**

By:

-   State
-   Organisation
-   Topic
-   Category
-   Keyword

# **Event Promotion System**

Members may submit events for promotion.

## **Event Workflow**

Submit

↓

Review

↓

Publish

↓

Promote

↓

Attend

## **Event Types**

Community Events

Workshops

Forums

Conferences

Webinars

Gatherings

# **Future Event Marketplace**

Future possibility:

Integrated event booking platform.

Potential functionality:

-   Ticket sales
-   Registrations
-   Event promotion
-   Commission model

This is a future enhancement rather than an immediate requirement.

# **Content Visibility Benefits**

Membership provides organisations with opportunities to increase visibility.

## **Organisation Visibility**

Increase awareness of organisational activities.

## **Event Visibility**

Increase attendance and participation.

## **Campaign Visibility**

Reach broader audiences.

## **Community Visibility**

Highlight local initiatives and achievements.

# **Community Directory Integration**

Content and directory profiles should support one another.

## **Example**

Organisation Profile

↓

Recent Stories

↓

Upcoming Events

↓

Campaign Activity

↓

Website Link

This creates a richer profile and improves discoverability.

# **Future Portal Integration**

The Member Portal becomes the central management hub.

## **Portal Functions**

Submit Story

Submit Event

Manage Content

View Content Status

Access Snippets

Access Resources

Track Participation

# **Future CRM Integration**

The content system should remain independent from any specific CRM.

Current Infrastructure:

Action Network

Action Builder

Future Infrastructure:

First Nations Action Platform

The content ecosystem should function regardless of which CRM is being used.

# **Success Metrics**

Measure:

### **Stories Published**

### **Events Promoted**

### **Campaigns Shared**

### **Newsletter Snippets Used**

### **Directory Profile Views**

### **Community Engagement**

### **Organisation Participation**

### **Website Traffic**

# **Strategic Value**

The First Nations Action Network is not simply creating a website.

It is creating a national content ecosystem that helps organisations share knowledge, increase visibility and strengthen community participation.

The more organisations contribute content, the more valuable the network becomes for everyone.

This creates a positive network effect where visibility, learning and engagement continue to grow over time.

# **Vision Statement**

Every organisation has stories worth sharing.

The First Nations Action Network helps those stories reach more people, strengthen more communities and inspire greater participation across Australia.