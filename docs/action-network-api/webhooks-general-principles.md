---
title: "Action Network"
author: "Action Network"
description: "Action Network"
source: https://actionnetwork.org/docs/webhooks/
date: 2026-08-05T04:17:07.126Z
---

## Webhooks General Principles

Action Network webhooks serve to inform other systems about things that took place in Action Network in close to real time, such as the signing of a petition of the completion of a donation.

Action Network webhooks are loosely based off of the [Open Supporter Data Interface specification version 1.1.1](https://github.com/opensupporter). They use HAL+JSON.

This document introduces general principles and definitions used in most webhook payloads calls. Documentation on individual payloads is available in the sidebar.

#### Sections

- [Setup and Testing](#setup)
- [Triggers](#triggers)
- [Payload Format](#format)
- [Navigation and Links](#navigation)
- [Delivery Rates, Errors, and Retries](#errors)

#### Setup and Testing

Webhooks can be created and managed from the API & Sync page, located in the 'Start Organizing' menu on the top of the user interface.

After choosing API & Sync and selecting the group you want to set up webhooks for, you can view your existing webhooks for that group, manage them, and set up new ones in the 'Webhooks' section of the sidebar.

To add a new webhook, click the 'New Webhook' button, enter the URL you want Action Network to POST to, and the trigger you want to use to fire this webhook. All URLs must accept valid HTTPS/SSL connections, and webhooks will only POST data to secure endpoints. Available trigger types are explained in more detail [below](#triggers). Click 'Save' to save your webhook. It will *not* be active immediately.

Once you've created your webhook it will show up in the list of webhooks in the 'Webhooks' section, listed by POST URL. Click the arrow icon on the right to expand this webhook's controls. You can send a test webhook by clicking the 'Send Test' button, which will send a test payload to your endpoint URL. You can toggle the webhook on and off with the 'Turn On'/'Turn Off' button (newly created webhooks are off and must be turned on to start working). And you can delete your webhook with the 'Delete' button.

[Back To Top ↑](#can_top)

#### Triggers

Currently there are four available triggers you can choose from when you create a webhook, took a specific action, all actions, all actions plus uploads, and subscribed.

**Took a specific action** allows you to select a certain action that is sponsored by your group, and will fire a webhook whenever an activist takes that action. The actions available for selection are petitions, events, forms, fundraisers, ticketed events, letter campaigns, call campaigns, surveys, or hosting or RSVPing to an event in an event campaign.

**All actions** will fire the webhook whenever an activist takes an action on any action page sponsored (or referred by) by your Action Network group. This includes signing a petition, RSVPing for an event, submitting a form, donating on a fundraising page, buying a ticket for a ticketed event, writing a letter in a letter campaign, filling out a survey, hosting or RSVPing to an event in an event campaign, taking 'action' in Salesforce via the Salesforce sync, and any API-based versions of those actions (such as a submission to a form over the API). This trigger *will not* fire on things that aren't actions, such as being part of an upload.

**All actions plus uploads** will fire the webhook whenever an activist takes an action on any action page sponsored (or referred by) by your Action Network group as described above, and in addition fire when non-action type events take place, including being part of an upload or a POST via the API person signup helper. This trigger *will not* fire on adding an activist manually (or editing their record), mass subscribed or unsubscribe via report results, subscribing to a child group via a ladder, or when a recurring donation occurs.

**Subscribed** will fire whenever an activist is subscribed to this group's list, either newly subscribed or resubscribed after being unsubscribed, marked as bouncing, or marked as a spam complainer. Any method of subscription (actions, uploads, adding directly, API, report mass subscribe, etc...) will trigger this webhook.

[Back To Top ↑](#can_top)

#### Payload Format

Webhook payloads are sent in modified OSDI format, with the `application/json` content-type.

The payload will be an array of hashes, each hash identified by its type. Typically you will only see one hash per array, but some events are batched (such as multiple outreaches representing letters written to multiple elected officials as part of a letter campaign). Most of these types will be the same as defined in the API, such as `osdi:signature` for a signature on a petition. Events that don't have direct API analogs or aren't defined in the OSDI specification (such as an upload event) will look similar, with their own defined types namespaced to Action Network (ex: `action_network:upload`).

Each hash will contain details about the webhook event in format similar to what you'd use to POST to our API. For example, a signature event will look like the [record signature helper](/docs/v2/record_signature_helper), with data about when the signature took place (`created_date` and `modified_date`), the comments on that petition signature, and an inline person hash containing the data the activist entered when they signed the petition. The hash will also contain links to each resource on the API (for example, the signature, the petition, and the person in the case of a petition signature) which can be followed for more details, see the [navigation section](#navigation) below. And the originating group sponsor where the event took place will be included as well, so you can tell which child group in a network this event originated from, for example.

Events that don't have direct API analogs or aren't defined in the OSDI specification (such as an upload event) will look similar, with their own defined fields. See the detailed documentation for each webhook payload for specific information, available in the sidebar.

**Only data that was entered directly when the event happened will be posted!**

For example, if an activist fills in only email address and zip code when signing a petition, even if they have additional core field data on their record like first name, the resulting webhook will only include email address and zip code. Same goes for custom fields -- only the fields entered during that action will be POSTed, not all custom fields that activist's record has. Same with tags, only those added during the event will be POSTed.

If you want additional information on the person, such as their full core fields, you can follow the links provided to retrieve those resources on the API, see the [navigation section](#navigation) below for more details.

The email address section will, in most cases, also note if the activist was subscribed due to this event, using the `status` field.

There are some details and exceptions to this mechanism. For example, adding an activist manually will not POST tags or custom fields added during that operation. See the detailed documentation for each webhook payload for specific exceptions, available in the sidebar.

Webhook payloads also include an `idempotency_key` which is unique to each webhook message. You can use this key to prevent taking action on the same webhook multiple times.

An example webhook payload from a signature event is shown here:

`POST https://your-webhook-url.com  Header: Content-Type: application/json`

`[   {     "osdi:signature": {       "identifiers": [         "action_network:d6bdf50e-c3a4-4981-a948-3d8c086066d7"       ],       "created_date": "2018-11-12T17:07:31Z",       "modified_date": "2018-11-12T17:07:31Z",       "comments": "Stop doing the thing",       "action_network:referrer_data": {         "source": "facebook"       },       "person": {         "created_date": "2018-11-12T17:07:31Z",         "modified_date": "2018-11-12T17:07:31Z",         "family_name": "Smith",         "given_name": "John",         "postal_addresses": [           {             "primary": true,             "region": "California",             "postal_code": "904043",             "country": "US",             "location": {               "latitude": 34.0335,               "longitude": -118.474,               "accuracy": "Approximate"             }           }         ],         "email_addresses": [           {             "address": "jsmith@mail.com",             "primary": true,             "status": "subscribed"           }         ],         "phone_numbers": [           {             "primary": true,             "number": "12024444444",             "number_type": "Mobile",             "status": "subscribed"           }         ],         "custom_fields": {           "employer": "Action Squared"         },         "languages_spoken": [           "en"         ]       },       "add_tags": [         "volunteer",         "member"       ],       "_links": {         "self": {           "href": "https://actionnetwork.org/api/v2/petitions/9f837109-710d-442f-8a99-857a21f36d25/signatures/d6bdf50e-c3a4-4981-a948-3d8c086066d7"         },         "osdi:petition": {           "href": "https://actionnetwork.org/api/v2/petitions/9f837109-710d-442f-8a99-857a21f36d25"         },         "osdi:person": {           "href": "https://actionnetwork.org/api/v2/people/699da712-929f-11e3-a2e9-12313d316c29"         }       }     },     "action_network:sponsor": {       "title": "Progressive Action Now",       "url": "https://actionnetwork.org/groups/progressive-action-now"     },     "idempotency_key": "1679091c5a880faf6fb5e6087eb1b2dc"   }   ]`

[Back To Top ↑](#can_top)

#### Navigation and Links

Webhook payloads will contain a links section that allows you to retrieve more information about various related resources using the API. The format will be identical to the links provided on the API normally.

All payloads will contain a link to the person resource of the activist who triggered the event. Some payloads will contain multiple links. For example, in the case of a webhook event on a petition signature, the links section will contain a link to the person who signed the petition, the submission they created when they signed, and a link to the petition resource itself. Follow these links to retrieve more data about each resource, such as an activist's full core or custom fields.

[Back To Top ↑](#can_top)

#### Delivery Rates, Errors, and Retries

Webhooks are not rate limited and we deliver webhooks in close to real time as triggers happen (typically with about a five minute delay), so when you set up an endpoint you should expect potentially a high volume of POST calls, depending on the activity of your Action Network group. For instance, if you trigger on all actions plus uploads and upload a large list to your group, you should expect several thousand POST calls per minute from the webhook.

Therefore, we encourage servers that receive webhooks to accept and store the webhook data immediately, and process it in the background later. This will enable your server to absorb a large volume of webhook calls at once without crashing, while saving the time-intensive intensive processing for a background job at a slower pace.

Receiving servers should return an HTTP 200 status code to acknowledge they have successfully received the webhook. Any other status code will be treated as an error. Receiving servers must also acknowledge reception of the webhook within 500ms. Longer response times will be aborted and considered an error.

We will retry any errors three times over the course of an hour, with an exponential backoff. After three attempts, if still unsuccessful, the webhook event will be discarded. You can use the `idempotency_key` to ensure data integrity.

Webhooks are not necessarily delivered in the order the events happened on Action Network.

[Back To Top ↑](#can_top)
