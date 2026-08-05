# FNAN read-only Action Network integration

This document defines the Action Network API surface used by the FNAN website.
The integration is read-only. Public event registration remains hosted by
Action Network through each event's `browser_url`.

Official documentation:

- [API overview](https://actionnetwork.org/docs/)
- [REST API version 2](https://actionnetwork.org/docs/v2/)
- [Events](https://actionnetwork.org/docs/v2/events)
- [Event campaigns](https://actionnetwork.org/docs/v2/event_campaigns)
- [Tags](https://actionnetwork.org/docs/v2/tags)

## Authentication and environment

The API key must remain server-only. Action Network authenticates requests with
the `OSDI-API-Token` header and limits API clients to four calls per second.

Create `.env.local` in the project root:

```text
ACTION_NETWORK_API_KEY=
```

Add the group-scoped FNAN key after the equals sign. Configure the same variable
in the deployment environment. Never rename it with a `NEXT_PUBLIC_` prefix.

## Selected endpoints

| Priority | Request | Website use |
| --- | --- | --- |
| Launch | `GET /api/v2/` | Credential and capability smoke test. |
| Launch | `GET /api/v2/events?per_page=25` | Public event collection; follow the HAL `next` link until exhausted. |
| Supported | `GET /api/v2/events/{id}` | Future individual event refresh or detail page. |
| Deferred | `GET /api/v2/event_campaigns` | Campaign-scoped discovery if FNAN adopts event campaigns. |
| Deferred | `GET /api/v2/tags` | Review and maintain the website event taxonomy. |
| Deferred | `GET /api/v2/fundraising_pages/{id}` | Public aggregate fundraising progress only. |
| Internal only | `GET /api/v2/forms/{id}/submissions` | Protected membership reporting; never expose raw submissions publicly. |

The public website does not request people, attendance, donation, list, or other
personal-data collections.

## Event publishing contract

An event is published only when all of these conditions are true:

- `status` is `confirmed`.
- `visibility` is `public`.
- `action_network:hidden` is `false`.
- `browser_url`, `title`, `start_date`, and an Action Network identifier exist.

FNAN uses these optional Action Network tags:

- `type:workshop`, `type:forum`, or another `type:` value controls the event
  type. Events without one display as `Event`.
- `format:online` displays the event as online.
- `format:in-person` displays the event as in person.

When no format tag exists, events with a venue, locality, or street address are
treated as in person; other events are treated as online.

## Operational checklist

- [ ] Add the FNAN group API key to `.env.local` and the deployment environment.
- [ ] Call `GET https://actionnetwork.org/api/v2/` from a secure environment to
  confirm that the key is valid and group-scoped.
- [ ] Confirm real event payloads contain the publishing fields above.
- [ ] Add `type:` and `format:` tags to each event where appropriate.
- [ ] Verify hidden, private, cancelled, tentative, and pending events do not
  appear on FNAN.
- [ ] Verify the homepage shows the next three upcoming events.
- [ ] Verify `/events` shows upcoming, past, calendar, and discovery views.
- [ ] Verify every registration action opens the matching Action Network page.
- [ ] Test missing credentials, invalid credentials, rate limiting, empty
  collections, pagination, and temporary Action Network failures.
- [ ] Confirm the API key never appears in client JavaScript, HTML, browser
  network requests, logs, or error messages.

## Scope boundary

The FNAN website does not create people or attendance records. Synchronising a
successful Stripe payment into Action Network would require a secure server-side
POST to an attendance helper and is outside this GET-only integration.
