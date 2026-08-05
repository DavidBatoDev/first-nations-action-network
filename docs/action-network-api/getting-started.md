---
title: "Action Network"
author: "Action Network"
description: "Action Network"
source: https://actionnetwork.org/docs/
date: 2026-08-05T04:16:02.255Z
---

The Action Network API allows organizers with Action Network accounts and, in most cases, API keys to interact with the Action Network system. The API supports use cases such as syncing online organizing data (people, email addresses, action histories) with other systems, migrating data between systems, managing subscriptions, pulling embed code for actions into CMS systems, creating your own forms to send in activist data, utilizing webhooks to inform other systems about things that took place in Action Network in close to real time (such as a signature on a petition or a successful donation), and similar functions.

The API is *not* intended to enable the creation of a replacement user interface.

The API contains two main parts -- a RESTful API with functions allowing you push and pull data (generally referred to as the API) and webhooks that can proactively inform your server about events happening in Action Network in close to real time (generally referrered to as webhooks).

#### Sections

- [Versions and what's new](#versions)
- [Technical considerations](#considerations)
- [Getting started](#start)
- [Tools and browsing the API](#browse)
- [Tutorials: Making your first calls](#tutorials)
- [Suggestions for speed and efficiency](#speed)

#### Versions and what's new

The Action Network API is currently in Version 2. Version 1 is depreciated and no longer supported. It will still work, but will not receive future enhancements or fixes. You can find Version 1 documentation [here](/docs/v1/overview).

Version 2 updates the Action Network API to version 1.1.1 of the OSDI specification, and specifically implements and changes a few key things:

**July 8, 2026**

- Added the `tag_list` array to `messages` and all action types, representing tags attached to the object.
- Added oData filtering options to `advocacy_campaigns`.
- Added vetting status options to the `status` field on `events`.
- Added checked in status options to the `status` field on `attendances`.

**August 23, 2024**

- Added a new action type, `surveys`, along with associated objects like `responses` and the `record_response_helper`.

**February 22, 2024**

- Added PUT options for `unique_id_lists`, allowing you to update ID Targets.

**December 14, 2023**

- Added a new endpoint, `unique_id_lists`, corresponding to ID Targets in the user interface.

**November 21, 2023**

- Added `verified_opened` as a statistic for messages.

**February 9, 2023**

- Added `throttled` as a status for messages.

**December 7, 2022**

- Added `idempotency_key` to webhook payloads.

**September 16, 2022**

- Added machine open statistic to messages endpoint.

**July 21, 2022**

- Added the ability to remove tags on person signup helper, record attendance helper, record outreach helper, record signature helper, and record submission helper.

**May 18, 2022:**

- Added the ability to filter events by start\_date and end\_date.

**June 24, 2021:**

- Added the ability to GET, POST, and PUT click to call campaigns under the advocacy campaigns endpoint.

**May 24, 2021:**

- Added the ability to enable background processing on some operations.
- Added the ability to GET, POST, and PUT end\_date on events.

**March 4, 2021:**

- Added the ability to POST mobile-only records.
- Added the ability to GET, POST, and PUT call campaigns under the advocacy campaigns endpoint.
- Added the ability to retrieve phone number and mobile subscription status on webhooks payloads.
- Added the ability to search and filter by phone number.

**August 24, 2020:**

- Added the ability to POST and PUT phone number and phone subscription status.

**August 5, 2020:**

- Added the ability to GET custom fields.

**May 27, 2020:**

- Added donated and total amount donated to messages statistics.
- Added email and mobile referrer to 'transaction' API endpoints such as signatures, submissions, etc...
- Added the ability to POST event campaigns.
- Added the ability to POST events into an event campaign.
- Added the ability to set a browser\_url for API-created actions such as forms, petitions, events, etc...

**November 20, 2018:**

- Added webhooks functionality.

**July 13, 2018:**

- Added the ability to create new tags via POST.

**June 4, 2018**

- Removed the embedded creator and organizer on events, for speed and stability.

**September 29, 2017:**

- Added a new javascript library in the tools section.

**September 4, 2017:**

- Endpoints for each action are now conveniently available to copy and paste on each action's manage page.

**July 31, 2017**

- Fixed a bug where the record\_attendance\_helper on the events API wasn't properly prefixed with osdi:. Both versions are now present for backwards compatibility.

**June 8, 2017**

- Endpoints and functionality have been added to the API to allow you to create, target, attach wrappers, and send mass email via the API.
- A read-only `wrappers` endpoint has been added allowing you to access email wrappers for your group for the purpose of attaching them to emails.
- A read-only `queries` endpoint has been added allowing you to access saved queries for your group for the purpose of attaching them to emails for targeting.
- A `messages` endpoint has been added allowing you to create, edit, target, schedule, send, and stop mass emails via the API.
- See the specific resource documentation pages for more information.
- Fixed a bug where lists on the API were not showing identifiers.

**May 13, 2017**

- You can now access attendances (RSVPs) for events over the API that are part of an event campaign your group sponsors, even if you don’t sponsor the event directly.
- Events on the API now have a `capacity` field if a max RSVP limit has been set for the event.

**September 2, 2016:**

- Removed the `total_pages` and `total_records` fields from the people collection on GET to improve speed.
- A next link will be present if the page in the collection is the last page, but not present if no resources are returned (ie. you've gone past the last page), to improve speed.
- People are no longer ordered by newest `modified_date` first in the people collection on GET, to improve speed.

**August 22, 2016:**

- Updated how subscription status works on the person signup helper. Previously, only the `subscribed` status was valid. Now, `subscribed` and `unsubscribed` are valid. If a person is new and no status or the `subscribed` status is passed, the person will be subscribed. If the person is new and `unsubscribed` is passed, they will be added to the list unsubscribed. If the person is not new and no status is passed, their subscription status will not be changed. If status is passed, the person's status will be changed. (In networks, a `subscribed` status in this last situation will travel up the network, so the person will be resubscribed at each level. An `unsubscribed` status will not.) Other helpers for actions continue to work as they did, with `subscribed` being the only valid status.
- Added a `languages_spoken` array to people on the API, indicating their preferred language.
- Added a read-only `action_network:hidden` field to action resources (petitions, forms, etc...) on the API, indicating whether the action is hidden in our UI or not.

**April 21, 2016:**

- Removed the `total_items` field from /lists API endpoints, as they were slow.

**March 26, 2016:**

- API action helper endpoints (such as the record signatures helper) can be POSTed to without an API key, returning success or failure but no other data. This allows you to use our API via javascript without fear, since no API keys will be leaked to browsers.
- You can also optionally add an autoresponse trigger to your helper POSTs, which will trigger an autoresponse email based on the settings of the page you're POSTing to. For example, if you're POSTing to a petition that has the autoresponse email turned on and you include the autoresponse trigger, the activist will get an autoresponse email as normal, thanking them for taking action. If you're POSTing to a page with the autoresponse turned off, they won't get that email.
- To go along with this, OSDI has released a jQuery plugin, allowing you to easily use unauthenticated POST and triggers in-browser. [Check it out here.](https://opensupporter.github.io/jquery-osdi/)
- Action API endpoints (/petitions, /forms, etc...) also return a URL to the featured banner image, if the action has one.
- We've removed the non-working `osdi:signatures` endpoint from the `fundraising_pages` endpoint and added the correct `osdi:person` endpoint on `attendances` in addition to the incorrect `osdi:people`, which will be removed in the next API version upgrade.

**December 8, 2015:**

- A new header is used for authentication instead of `api-key` -- instead, please use `OSDI-API-Token`.
- Questions and question answers have been removed. Custom fields are now expressed as inline object hashes on each person record, simplifying retrieving and working with custom fields.
- Tags and taggings endpoints have been added, allowing you to view, add, and remove tag data on people.
- Advocacy campaign and outreach endpoints have been added, which correspond to our letter campaigns tool, allowing you to view, add, and modify these resources.
- Queries have been renamed lists, with similar functionality.
- Attendance has been renamed to attendances, modified\_at and created\_at to modified\_date and created\_date, originating\_system to origin\_system, url to browser\_url, and other small naming changes.
- Administrative titles are now available on the api as name fields, and summary has moved to the title field.
- The API now returns all people on your email list, whether they are subscribed or not. A status field indicates their subscription status. Changing that status field will subscribe or unsubscribe them from your list.
- POSTing (either to helpers or not) will now respect subscription status. If the person you post is new to your list, they will be subscribed. If not, their subscription status will not change. If you are using helpers, if you pass a subscribed value for status, we will subscribe that person.
- The OSDI person signup helper has been implemented, allowing you to add people to your list directly.
- More embed options have been added to embed endpoints, reflecting the full range of widget types available.
- The modified\_date on person records now updates any time a person takes an action, allowing for easier syncing of action history via oData queries.
- Every endpoint has been updated to conform to the latest OSDI standard, 1.1.0, with some minor field name changes as well as functionality updates.

[Back To Top ↑](#can_top)

#### Technical considerations

The Action Network API and webhooks are served in HAL+JSON format. It generally conforms to the Open Supporter Data Interface (OSDI) specification version 1.0.2, which can be found at [opensupporter.org](https://github.com/opensupporter).

HAL provides links to make navigation between endpoints and resources easy. In addition, the API is curied, linking directly to documentation within API calls.

The `Content-Type: application/json` header is generally required when making requests to the API.

We rate limit the API to a maximum of 4 calls per second.

API users are encouraged to queue their API calls and retry failures with exponential backoff, to ensure smooth API operation.

Webhooks are delivered in as close to real time as possible (typically with a delay of up to 5 minutes). More information about webhook rates and limits can be found in the [webhooks documentation](/docs/webhooks).

[Back To Top ↑](#can_top)

#### Getting started

API entry point (AEP) is [https://actionnetwork.org/api/v2](https://actionnetwork.org/api/v2)

An API key is required to access most of the API. API keys and webhooks are considered a partner feature. Please [contact us to become a partner](/contact). Each user account and group on the Action Network has a separate API key allowing you to access that user or group's data.

Once you've been given access to our API, you can generate your key from the API & Sync page, located in the 'Start Organizing' menu, in the right column. Once on the page, first choose the list you want to generate a key for. Choosing your personal list will allow you to add actions and people to your personal account's email list. Choosing any groups you are an administrator of allows you to add actions or people to that group's list. After you select the list, you can generate an API key for that list.

You can revoke your key and regenerate a new one from the API & Sync page.

**Note:** Keep your API key secret. Anyone with your API key will be able to access any data in your account. Therefore, large parts of the Action Network API are *not* suitable for front end-only implementations (such as a javascript client), as this could expose your API key to others. However, some endpoints allow POSTed data without an API key, making them suitable for javascript implementations.

API keys must be sent as a header in this format:

            ` OSDI-API-Token: your_api_key_here`

Some portions of the API are accessible without a key. Specifically, we allow posting of data using the helper endpoints without an API key, allowing for javascript implementations where leaking an API key to a user's browser would be unacceptable. See the helper documentation for specifics and examples, or the [blind POST and autoresponse](https://actionnetwork.org/docs/v2/unauthenticated-post/) tutorial.

Webhooks can be set up from the API & Sync page as well. Enter the URL you want Action Network to POST the webhook too, as well as what types of things you want to trigger the webhook (such as new subscribers or any action taken). More details about webhook options can be found on the [main webhooks documentation page](/docs/webhooks).

[Back To Top ↑](#can_top)

#### Tools and browsing the API

**Browsing the API**

Once you have your API key, [you can try the API using our browser here](/api/browser/#https://actionnetwork.org/api/v2/). Make sure to enter your API key to access your data.

The browser is extremely useful for getting a feel for how the Action Network API works. It supports GET, POST, PUT and other operations. It is based off of Mike Kelly's HAL browser -- you can read more about it [here](https://github.com/mikekelly/hal-browser).

**Ruby Gem**

ControlShift has created a Ruby client for interacting with the Action Network REST API. Bug reports and pull requests are welcome on GitHub. [Check it out here.](https://github.com/controlshift/action-network-rest)

**Discovering API Endpoints**

The browser, mentioned above, is a great way to discover API endpoints. You can use the browser to move through the API and find the endpoint for a certain petition, for instance. However, for easy access, each action has its API endpoint displayed in the user interface, on the action's manage page in the sidebar, visible if you have partner permissions (the permission needed to access the API in the first place).

**Testing Webhooks**

[Beeceptor](https://beeceptor.com) or [Request Catcher](https://requestcatcher.com/) are good tools to easily test your webhooks. After setting them up as the endpoint you'd like to POST to, they will display the webhook contents they receive so you can see how our payloads will arrive to your server.

Note that data sent to these tools is semi-public (security by obscurity) so you should be careful about sending real data on real people to these testing tools. For a more private option you can set up something like [ngrok](https://ngrok.com/).

**jQuery Plugin**

OSDI has released a jQuery plugin, which works with our unauthenticated POST and autoresponse trigger features, allowing you to create forms and send in responses over the API using javascript running in a user's browser.[Check it out here.](http://opensupporter.github.io/jquery-osdi/)

**CSV to API Calls**

The csv2osdi tool takes a CSV file and uses it to send API calls, allowing you to easily add people, tags, and the like. [Check it out here.](https://github.com/joshco/csv2osdi)

**Libraries**

The [OSDI-client](https://github.com/ben-pr-p/osdi-client) library is a javascript/node based library for interacting easily with an OSDI-compliant API like ours.

And, because the Action Network API conforms to the OSDI standard, which is itself a JSON+HAL API, any of the many libraries available in various languages to work with HAL APIs can be used. [A great list to get started with us here.](https://github.com/mikekelly/hal_specification/wiki/Libraries)

[Back To Top ↑](#can_top)

#### Tutorials: Making your first calls

Once you have an API key, it's time to make your first calls. We've put together a few tutorial scenarios to help you understand what the API can do.

- [Get a list of activists on to your email list](/docs/v2/get-people/)
- [Get a list of events created by your account](/docs/v2/get-actions/)
- [Get a list of people who signed one of your petitions](/docs/v2/get-actiontakers/)
- [Get the embed code for a form you created](/docs/v2/get-embed/)
- [Add people to your email list](/docs/v2/post-people/)
- [Post a new fundraising page from another system and add donors to that page and your list](/docs/v2/post-actions/)
- [Add signatures to a petition via a custom form, with an email autoresponse](/docs/v2/unauthenticated-post/)
- [Unsubscribe people from your list](/docs/v2/delete/)
- [Send a mass email](/docs/v2/email/)

Or, [dive right into the full API documentation here](/docs/v2/) and [webhooks documentation here](/docs/webhooks).

[Back To Top ↑](#can_top)

#### Suggestions for speed and efficiency

We have a few suggestions to ensure speed and efficiency when using the API:

- Avoid big collections where possible, as they are sometimes slow and will often require lots of calls via paging.
- Make use of [oData modified\_date queries](/docs/v2/#odata) to only retrieve new records from collections since your last run through the API.
- Because calls slow down the farther down in pages you go (ex: page 10 will be much faster to retrieve than page 10,000), prefer to retrieve records from the API more often rather than less often to limit the number of pages you'll need to go through. For example, run your code to pull newly modified records every hour rather than every day.
- When doing heavy operations where you could exceed the rate limit or where you don't need the results immediately, use [background processing](/docs/v2/#background-processing) if it's available on that operation.

[Back To Top ↑](#can_top)
