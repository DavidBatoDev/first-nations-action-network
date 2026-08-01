# Action Network Membership Form Setup

This document defines the external Action Network form required by
`/membership/apply`. The website intentionally shows an unavailable state until
this form is created and its widget slug is configured.

## Action configuration

- Action type: Form
- Title: Membership Application
- Sponsor/owner: First Nations Action Network group reviewed by Steve
- Purpose: Organisation membership assessment and follow-up only
- Payment: None
- Newsletter or campaign automation: None
- Website widget: Version 2 form widget

## Form fields

Configure the fields in this order.

| Group | Field | Required | Input |
| --- | --- | --- | --- |
| Organisation | Organisation name | Yes | Single line |
| Organisation | Organisation type | Yes | Select |
| Organisation | State or territory | Yes | Select |
| Organisation | Website or social link | No | URL |
| Organisation | Postcode | No | Postal code |
| Primary contact | First name | Yes | Standard first name |
| Primary contact | Last name | Yes | Standard last name |
| Primary contact | Position | Yes | Single line |
| Primary contact | Email | Yes | Standard email |
| Primary contact | Phone | No | Standard phone |
| Goals | Organisation goals | Yes | Long text |
| Goals | Current challenges | Yes | Long text |
| Goals | Why do you want to join? | Yes | Long text |
| Membership | Preferred membership cadence | Yes | Radio |
| Consent | Membership application follow-up | Yes | Checkbox |

Organisation type options:

- First Nations Organisation
- Ally Organisation
- Reconciliation Group
- Community Group
- Advocacy Organisation
- Cultural Organisation
- Workplace Network
- Social Enterprise

State or territory options:

- Australian Capital Territory
- New South Wales
- Northern Territory
- Queensland
- South Australia
- Tasmania
- Victoria
- Western Australia

Membership cadence options:

- A$1,200 annually
- A$150 monthly

The cadence question must explain that it records a preference only. It does
not take payment or commit the organisation to membership.

## Consent and data use

Use this required consent statement:

> I agree that First Nations Action Network may use this information to assess
> our organisation's interest in membership and contact me about next steps. I
> understand this does not create a membership or payment.

Do not add applicants to newsletters, campaigns or general marketing
automations. Store the follow-up-only consent answer on the contact record so
applicants can be excluded from broadcasts unless they opt in elsewhere.

## Confirmation

Use this in-widget thank-you message:

> Your membership application has been received. First Nations Action Network
> will review the information and contact your nominated person about next
> steps. No payment has been taken, no membership has been activated and no
> account has been created.

Do not promise a response time until the internal review process is approved.

## Website configuration

Copy the final widget slug from the Action Network embed URL. For example, the
slug in the following URL is `membership-application`:

```text
https://actionnetwork.org/widgets/v2/form/membership-application
```

Set it for local development or the Vercel deployment:

```text
ACTION_NETWORK_MEMBERSHIP_FORM_SLUG=membership-application
```

The value may contain lowercase letters, numbers and hyphens only. The website
does not accept or expose an Action Network API key.

## Acceptance check

Submit one application clearly labelled as a test and verify:

- Every answer reaches the correct Action Network field.
- The record belongs to the approved FNAN group.
- The consent value is stored.
- No payment or marketing automation runs.
- The approved confirmation message appears.

Remove the test record after verification.
