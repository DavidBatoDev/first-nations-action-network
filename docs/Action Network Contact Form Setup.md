# Action Network Contact Form Setup

This document defines the external Action Network form required by `/contact`
(the "Book a conversation" destination). The website intentionally shows an
unavailable state until this form is created and its widget slug is configured.

## Action configuration

- Action type: Form
- Title: Book a Conversation
- Sponsor/owner: First Nations Action Network group reviewed by Steve
- Purpose: General enquiries, membership conversations and partnership contact
- Payment: None
- Newsletter or campaign automation: None (enquiry follow-up only)
- Website widget: Version 2 form widget

## Form fields

Configure the fields in this order.

| Group | Field | Required | Input |
| --- | --- | --- | --- |
| About you | First name | Yes | Standard first name |
| About you | Last name | Yes | Standard last name |
| About you | Email | Yes | Standard email |
| About you | Phone | No | Standard phone |
| About you | Organisation or group | No | Single line |
| Enquiry | What is this about? | Yes | Select |
| Enquiry | Message | Yes | Long text |
| Consent | Enquiry follow-up | Yes | Checkbox |

"What is this about?" options:

- Membership
- Training and development
- Partnership
- Events
- Community directory
- General enquiry

## Consent and data use

Use this required consent statement:

> I agree that First Nations Action Network may use this information to respond
> to my enquiry. I understand this does not add me to any newsletter or
> campaign.

Do not add enquirers to newsletters, campaigns or general marketing
automations. Store the follow-up-only consent answer on the contact record so
enquirers can be excluded from broadcasts unless they opt in elsewhere.

## Confirmation

Use this in-widget thank-you message:

> Thanks for reaching out. First Nations Action Network has received your
> message and will be in touch about next steps.

Do not promise a response time until the internal process is approved.

## Website configuration

Copy the final widget slug from the Action Network embed URL. For example, the
slug in the following URL is `book-a-conversation`:

```text
https://actionnetwork.org/widgets/v2/form/book-a-conversation
```

Set it for local development or the Vercel deployment:

```text
ACTION_NETWORK_CONTACT_FORM_SLUG=book-a-conversation
```

The value may contain lowercase letters, numbers and hyphens only. The website
does not accept or expose an Action Network API key. Both `/contact` and
`/membership/apply` share the generic `ActionNetworkForm` component and load the
Action Network v2 form widget with their respective public slugs.

## Acceptance check

Submit one enquiry clearly labelled as a test and verify:

- Every answer reaches the correct Action Network field.
- The record belongs to the approved FNAN group.
- The consent value is stored.
- No newsletter or campaign automation runs.
- The approved confirmation message appears.

Remove the test record after verification.
