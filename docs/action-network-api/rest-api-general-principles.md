---
title: "Action Network"
author: "Action Network"
description: "Action Network"
source: https://actionnetwork.org/docs/v2/
date: 2026-08-05T04:16:38.005Z
---

## REST API General Principles Version 2

The Action Network API allows organizers with Action Network accounts and, in most cases, API keys to interact with the Action Network system. The API supports use cases such as syncing online organizing data (people, email addresses, action histories) with other systems, migrating data between systems, managing subscriptions, pulling embed code for actions into CMS systems, creating your own forms to send in activist data, and similar functions.

The API is *not* intended to enable the creation of a replacement user interface.

The Action Network API version 2 is based off of the [Open Supporter Data Interface specification version 1.1.1](https://github.com/opensupporter). It uses HAL+JSON and is generally RESTful.

This document introduces general principles and definitions used in most API calls. Documentation on individual endpoints and functions is available in the sidebar.

#### Sections

- [API Entry Point (AEP)](#aep)
- [Authentication](#auth)
- [Tools](#tools)
- [Resources](#resources)
- [Embedded resources](#embedded)
- [Collections](#collections)
- [Paging and Navigation](#paging)
- [Curies and namespacing](#curies)
- [Field types and notation](#field-types)
- [Creating, editing, updating, and deleting (CRUD)](#crud)
- [Searching and filtering (OData)](#odata)
- [Background Processing and Queueing](#background-processing)

#### API Entry Point (AEP)

The AEP is your entry point into the Action Network API. From there you will find links to all collections and resources in the system as well as documentation.

You can learn more about the AEP and its attributes [here](/docs/v2/aep).

[Back To Top ↑](#can_top)

#### Authentication

An API key is required to access most of the API. API keys are provided by request, and are considered a partner feature. You must be a partner to generate an API key. Please [contact us to become a partner](/contact). Each user account and group on the Action Network has a separate API key allowing you to access that user or group's data. You can manage your keys from the API & Sync page, available in the Start Organizing menu above.

Once you've been given access to generate an API, you can generate and manage your key from the API & Sync page, located in the Start Organizing menu above. Once on the page, first choose the list you want to generate a key for. Choosing your personal list will allow you to add actions and people to your personal account's email list. Choosing any groups you are an administrator of allows you to add actions or people to that group's list. After you select the list, you can generate an API key for that list.

**Note:** Keep your API key secret. Anyone with your API key will be able to access any data in your account. Therefore, large parts of the Action Network API are *not* suitable for front end-only implementations (such as a javascript client), as this could expose your API key to others. However, some endpoints allow POSTed data without an API key, making them suitable for javascript implementations.

API keys must be sent as a header in this format:

`OSDI-API-Token: your_api_key_here`

You can revoke your key and regenerate a new one from the API & Sync page. Note that this process is instant and irreversible -- if you revoke a key, any application using that key will no longer be able to authenticate.

Some portions of the API are accessible without a key. Specifically, we allow posting of data using the helper endpoints without an API key, allowing for javascript implementations where leaking an API key to a user's browser would be unacceptable. See the helper documentation for specifics and examples, or the [blind POST and autoresponse](https://actionnetwork.org/docs/v2/unauthenticated-post/) tutorial.

[Back To Top ↑](#can_top)

#### Tools

**Browsing the API**

Once you have your API key, [you can try the API using our browser here](/api/browser/#https://actionnetwork.org/api/v2/). Make sure to enter your API key to access your data.

The browser is extremely useful for getting a feel for how the Action Network API works. It supports GET, POST, PUT and other operations. It is based off of Mike Kelly's HAL browser -- you can read more about it [here](https://github.com/mikekelly/hal-browser).

**Ruby Gem**

ControlShift has created a Ruby client for interacting with the Action Network REST API. Bug reports and pull requests are welcome on GitHub. [Check it out here.](https://github.com/controlshift/action-network-rest)

**jQuery Plugin**

OSDI has released a jQuery plugin, which works with our unauthenticated POST and autoresponse trigger features, allowing you to create forms and send in responses over the API using javascript running in a user's browser.[Check it out here.](http://opensupporter.github.io/jquery-osdi/)

**CSV to API Calls**

The csv2osdi tool takes a CSV file and uses it to send API calls, allowing you to easily add people, tags, and the like. [Check it out here.](https://github.com/joshco/csv2osdi)

**Libraries**

The [OSDI-client](https://github.com/ben-pr-p/osdi-client) library is a javascript/node based library for interacting easily with an OSDI-compliant API like ours.

And, because the Action Network API conforms to the OSDI standard, which is itself a JSON+HAL API, any of the many libraries available in various languages to work with HAL APIs can be used. [A great list to get started with us here.](https://github.com/mikekelly/hal_specification/wiki/Libraries)

[Back To Top ↑](#can_top)

#### Resources

Almost everything in the Action Network API is a resource. An individual person is a resource, as is a petition, as is an action a specific person takes on a petition.

Resources have an array of `identifiers` -- one and only one generated by the Action Network when that resource is created, as well as any foreign identifiers you have passed in when you create resources using POST or modify them using PUT. Identifiers must be unique at least by type. We deduplicate foreign identifiers. Identifiers are deduplicated globally, across groups and API keys, so ensure any you set are globally unique by type. We do not tend to recommend using foreign identifiers, they are often unnecessary. You should only use identifiers if you need to match back to your system. Identifiers cannot be removed once they are created, but you can have more than one identifier.

Resources also have `created_date` and `modified_date` fields, created by our system, and a hash of `_links` pointing to various URL endpoints that are related to that resource, including at least one pointing to itself (the `self` link).

Here is an example of a person resource with a native and foreign identifier, `created_date` and `modified_date` fields, and links to various related resources:

`{   "identifiers": [     "action_network:d3e27e15-e5b5-4707-be96-8bc359462133",     "foreign_system:1"   ],   "modified_date": "2014-03-25T15:26:45Z",   "created_date": "2014-03-24T12:47:29Z",   "email_addresses": [     {       "primary": true,       "address": "jdoe@mail.com",       "status": "subscribed"     }   ],   "phone_numbers": [     {       "primary": true,       "number": "12021234444",       "number_type": "Mobile",       "status": "subscribed"     }   ],   "postal_addresses": [     {       "primary": true,       "locality": "Washington",       "region": "DC",       "postal_code": "20009",       "country": "US",       "language": "en",       "location": {         "latitude": 38.919,         "longitude": -77.0379,         "accuracy": "Approximate"       }     }   ],   "_links": {     "self": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133"     },     "osdi:attendances": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/attendances"     },     "osdi:signatures": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/signatures"     },     "osdi:submissions": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/submissions"     },     "osdi:donations": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/donations"     },     "osdi:outreaches": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/outreaches"     },     "osdi:taggings": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/taggings"     },     "curies": [       {         "name": "osdi",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       },       {         "name": "action_network",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       }     ]   } }`

[Back To Top ↑](#can_top)

#### Embedded resources

The Action Network API will sometimes embed related resources within a parent resource for convenience. For example, when you request a petition resource, the API will embed the person resource of the creator of that petition along with the petition resource itself, saving you an API call to find out who created the petition in question.

Embedded resources are prefixed with the `_embedded` field name. Any resource that is embedded will always also be linked in the `_links` section.

For example, here is a petition with an embedded creator:

`{   "identifiers": [     "action_network:7580a324-9a72-11e3-a2e9-12313d316c29"   ],   "created_date": "2014-02-06T16:04:05Z",   "modified_date": "2014-02-20T21:16:57Z",   "title": "Stop doing the bad thing",   "description": "<p>Please stop doing this really bad thing.</p>",   "petition_text": "Mayor Doe, stop doing the bad thing.",   "browser_url": "https://actionnetwork.org/petitions/stop-doing-the-bad-thing",   "total_signatures": 2637,   "tag_list": [],   "target": [     {       "name": "Mayor Doe"     }   ],   "_embedded": {     "osdi:creator": {       "given_name": "John",       "family_name": "Smith",       "identifiers": [         "action_network:c945d6fe-929e-11e3-a2e9-12313d316c29"       ],       "modified_date": "2014-03-25T15:26:45Z",       "created_date": "2014-03-24T12:47:29Z",       "email_addresses": [         {           "primary": true,           "address": "jsmith@mail.com",           "status": "subscribed"         }       ],       "phone_numbers": [         {           "primary": true,           "number": "12021234444",           "number_type": "Mobile",           "status": "subscribed"         }       ],       "postal_addresses": [         {           "primary": true,           "address_lines": [             "1600 Pennsylvanie Ave."           ],           "locality": "Washington",           "region": "DC",           "postal_code": "20009",           "country": "US",           "language": "en",           "location": {             "latitude": 38.919,             "longitude": -77.0379,             "accuracy": "Approximate"           }         }       ],       "languages_spoken": [         "en"       ],       "_links": {         "self": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"         },         "osdi:attendances": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/attendances"         },         "osdi:signatures": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/signatures"         },         "osdi:submissions": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/submissions"         },         "osdi:donations": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/donations"         },         "osdi:outreaches": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/outreaches"         },         "osdi:taggings": {           "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/taggings"         },         "curies": [           {             "name": "osdi",             "href": "https://actionnetwork.org/docs/v2/{rel}",             "templated": true           },           {             "name": "action_network",             "href": "https://actionnetwork.org/docs/v2/{rel}",             "templated": true           }         ]       }     }   },   "_links": {     "self": {       "href": "https://actionnetwork.org/api/v2/petitions/7580a324-9a72-11e3-a2e9-12313d316c29"     },     "osdi:signatures": {       "href": "https://actionnetwork.org/api/v2/petitions/7580a324-9a72-11e3-a2e9-12313d316c29/signatures"     },     "osdi:creator": {       "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"     },     "action_network:embed": {       "href": "https://actionnetwork.org/api/v2/petitions/7580a324-9a72-11e3-a2e9-12313d316c29/embed"     },     "curies": [       {         "name": "osdi",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       },       {         "name": "action_network",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       }     ]   } }`

[Back To Top ↑](#can_top)

#### Collections

An array of resources is called a collection. A URL endpoint may return a collection of resources. For example, visiting `https://actionnetwork.org/api/v2/people` will return a collection of people corresponding to the email list associated with your api key.

Individual resources in a collection are both embedded in the array and linked to in the links section, allowing for easy browsing and navigation.

Here is an example of the forms collection:

`{   "total_pages": 10,   "per_page": 25,   "page": 1,   "total_records": 250,   "_links": {     "next": {       "href": "https://actionnetwork.org/api/v2/forms?page=2"     },     "self": {       "href": "https://actionnetwork.org/api/v2/forms"     },     "osdi:forms": [       {         "href": "https://actionnetwork.org/api/v2/forms/65345d7d-cd24-466a-a698-4a7686ef684f"       },       {         "href": "https://actionnetwork.org/api/v2/forms/adb951cb-51f9-420e-b7e6-de953195ec86"       },       //truncated for brevity     ],     "curies": [       {         "name": "osdi",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       },       {         "name": "action_network",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       }     ]   },   "_embedded": {     "osdi:forms": [       {         "origin_system": "FreeForms.com",         "identifiers": [           "action_network:65345d7d-cd24-466a-a698-4a7686ef684f",           "free_forms:1"         ],         "created_date": "2014-03-25T14:40:07Z",         "modified_date": "2014-03-25T14:47:44Z",         "title": "Tell your story",         "total_submissions": 25,         "action_network:hidden": false,         "tag_list": [],         "_embedded": {           "osdi:creator": {             "given_name": "John",             "family_name": "Doe",             "identifiers": [               "action_network:c945d6fe-929e-11e3-a2e9-12313d316c29"             ],             "created_date": "2014-03-24T18:03:45Z",             "modified_date": "2014-03-25T15:00:22Z",             "email_addresses": [               {                 "primary": true,                 "address": "jdoe@mail.com",                 "status": "subscribed"               }             ],             "phone_numbers": [               {                 "primary": true,                 "number": "12021234444",                 "number_type": "Mobile",                 "status": "subscribed"               }             ],             "postal_addresses": [               {                 "primary": true,                 "address_lines": [                   "1600 Pennsylvania Ave"                 ],                 "locality": "Washington",                 "region": "DC",                 "postal_code": "20009",                 "country": "US",                 "language": "en",                 "location": {                   "latitude": 32.935,                   "longitude": -73.1338,                   "accuracy": "Approximate"                 }               }             ],             "languages_spoken": [               "en"             ],             "_links": {               "self": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"               },               "osdi:attendances": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/attendances"               },               "osdi:signatures": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/signatures"               },               "osdi:submissions": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/submissions"               },               "osdi:donations": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/donations"               },               "osdi:outreaches": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/outreaches"               },               "osdi:taggings": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/taggings"               }             }           }         },         "_links": {           "self": {             "href": "https://actionnetwork.org/api/v2/forms/65345d7d-cd24-466a-a698-4a7686ef684f"           },           "osdi:submissions": {             "href": "https://actionnetwork.org/api/v2/forms/65345d7d-cd24-466a-a698-4a7686ef684f/submissions"           },           "osdi:record_submission_helper": {             "href": "https://actionnetwork.org/api/v2/forms/65345d7d-cd24-466a-a698-4a7686ef684f/submissions"           },           "osdi:creator": {             "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"           },           "action_network:embed": {             "href": "https://actionnetwork.org/api/v2/forms/65345d7d-cd24-466a-a698-4a7686ef684f/embed"           }         }       },       {         "identifiers": [           "action_network:adb951cb-51f9-420e-b7e6-de953195ec86"         ],         "created_date": "2014-03-21T23:39:53Z",         "modified_date": "2014-03-25T15:26:45Z",         "title": "Take our end of year survey",         "description": "<p>Let us know what you think!</p>",         "call_to_action": "Let us know",         "browser_url": "https://actionnetwork.org/forms/end-of-year-survey",         "featured_image_url": "https://actionnetwork.org/images/survey.jpg",         "total_submissions": 6,         "action_network:hidden": false,         "tag_list": [],         "_embedded": {           "osdi:creator": {             "given_name": "John",             "family_name": "Doe",             "identifiers": [               "action_network:c945d6fe-929e-11e3-a2e9-12313d316c29"             ],             "created_date": "2014-03-24T18:03:45Z",             "modified_date": "2014-03-25T15:00:22Z",             "email_addresses": [               {                 "primary": true,                 "address": "jdoe@mail.com",                 "status": "subscribed"               }             ],             "phone_numbers": [               {                 "primary": true,                 "number": "12021234444",                 "number_type": "Mobile",                 "status": "subscribed"               }             ],             "postal_addresses": [               {                 "primary": true,                 "address_lines": [                   "1600 Pennsylvania Ave."                 ],                 "locality": "Washington",                 "region": "DC",                 "postal_code": "20009",                 "country": "US",                 "language": "en",                 "location": {                   "latitude": 32.934,                   "longitude": -74.5319,                   "accuracy": "Approximate"                 }               }             ],             "languages_spoken": [               "en"             ],             "_links": {               "self": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"               },               "osdi:attendances": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/attendances"               },               "osdi:signatures": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/signatures"               },               "osdi:submissions": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/submissions"               },               "osdi:donations": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/donations"               },               "osdi:outreaches": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/outreaches"               },               "osdi:taggings": {                 "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29/taggings"               }             }           }         },         "_links": {           "self": {             "href": "https://actionnetwork.org/api/v2/forms/adb951cb-51f9-420e-b7e6-de953195ec86"           },           "osdi:submissions": {             "href": "https://actionnetwork.org/api/v2/forms/adb951cb-51f9-420e-b7e6-de953195ec86/submissions"           },           "osdi:record_submission_helper": {             "href": "https://actionnetwork.org/api/v2/forms/adb951cb-51f9-420e-b7e6-de953195ec86/submissions"           },           "osdi:creator": {             "href": "https://actionnetwork.org/api/v2/people/c945d6fe-929e-11e3-a2e9-12313d316c29"           },           "action_network:embed": {             "href": "https://actionnetwork.org/api/v2/forms/adb951cb-51f9-420e-b7e6-de953195ec86/embed"           }         }       },       //truncated for brevity     ]   } }`

Note that not all collections will return `total_pages` and `total_records` fields. These are sometimes omitted to improve speed, for example on the people collection.

[Back To Top ↑](#can_top)

#### Paging and Navigation

By default we will return 25 resources per page when querying a collection. You can adjust the number of items returned by using the `?per_page=number_of_items_per_page` URL argument. **Note:** You can retrieve a maximum of 25 resources per page.

To move through pages, use the previous and next links in the link section, or use the `?page=page_number` URL argument to jump to a specific page

[Back To Top ↑](#can_top)

#### Curies and namespacing

A curie section is included with each API response. Curies are templated links that allow you to quickly find documentation on resources.

Curies are related to resources labeled in the `[curie name]:[URI fragment]` format. For example, if a resource is labeled with the code `osdi:person` you would find the curie labeled 'osdi' and then add people to the templated URL.

For example, here is a person resource:

`{   "identifiers": [     "action_network:d3e27e15-e5b5-4707-be96-8bc359462133",     "foreign_system:1"   ],   "modified_date": "2014-03-25T15:26:45Z",   "created_date": "2014-03-24T12:47:29Z",   "email_addresses": [     {       "primary": true,       "address": "jdoe@mail.com",       "status": "subscribed"     }   ],   "phone_numbers": [     {       "primary": true,       "number": "12021234444",       "number_type": "Mobile",       "status": "subscribed"     }   ],   "postal_addresses": [     {       "primary": true,       "locality": "Washington",       "region": "DC",       "postal_code": "20009",       "country": "US",       "language": "en",       "location": {         "latitude": 38.919,         "longitude": -77.0379,         "accuracy": "Approximate"       }     }   ],   "languages_spoken": [     "en"   ],   "_links": {     "self": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133"     },     "osdi:attendances": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/attendances"     },     "osdi:signatures": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/signatures"     },     "osdi:submissions": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/submissions"     },     "osdi:donations": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/donations"     },     "osdi:outreaches": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/outreaches"     },     "osdi:taggings": {       "href": "https://actionnetwork.org/api/v2/people/d3e27e15-e5b5-4707-be96-8bc359462133/taggings"     },     "curies": [       {         "name": "osdi",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       },       {         "name": "action_network",         "href": "https://actionnetwork.org/docs/v2/{rel}",         "templated": true       }     ]   } }`

To look up documentation on, say, the `osdi:donations` link, you would find the curie named osdi and add donations on to the end of the specified link to create `https://actionnetwork.org/docs/v2/donations`, which is the link to documentation about this resource.

Curies also serve as namespaces. For example, things labeled `osdi:[resource]` correspond to the OSDI specification. Things labeled `action_network:[resource]` are namespaced resources that appear in the Action Network API but are not part of the OSDI specification.

[Back To Top ↑](#can_top)

#### Field types and notation

Each page of documentation about a specific resource contains charts showing all of the field names for that resource, their type, whether they are required, and a description about what they represent.

When describing elements of a JSON hash, dot notation will be used. For example, take this hash:

```json

{
  "object" : {
    "name" : "this object has a name",
    "value" : "this object has a value"
  }
}
```

The "object" hash will appear as a named type in the main chart describing each field. It will be linked to a smaller chart below showing the fields within that hash.

Type may include definitions such as `string` or `datetime`. Field types can also be arrays, which are noted with the `[]` notation. If the array is an array of JSON hashes, then the array is named (ex: `email_addresses[]`) and linked to the chart below describing the fields in the hash. Otherwise, it will be notated as an array of a certain type, such as an array of strings, represented as `strings[]`.

Finally, field types can be an embedded resource, which will be noted with a `*`, such as `Person*`, and linked to the documentation on that resource.

[Back To Top ↑](#can_top)

#### Creating, editing, updating, and deleting (CRUD)

Generally, the Action Network API supports RESTful Create/Read/Update/Delete (CRUD) operations. However, only certain resources will respond to certain operations.

To create new resources, use POST. Generally, you post to endpoints of collections, such as `https://actionnetwork.org/api/v2/petitions` to create a new petition.

When you need to associate a resource you are creating via POST to another existing resource, you would post a link to that other resource in a `_links` section of your POST message. However, some collections have special 'helper' links that are labeled as such. These helpers are used for creating or updating two resources at the same time (such as a new person to be added to the list and a signature to a petition they signed). This is explained in more detail (with examples) in each helper's documentation.

To view a resource or a collection, use GET on its endpoint.

To edit or update resources, use PUT. Generally, you update on endpoints identifying individual resources, not endpoints associated with collections of resources. Only some fields may be update-able. For examples, see the documentation on individual resources.

PUT operations will attempt to upsert data. No data will be removed unless it is explicitly nulled using `null` as a value. Some fields cannot be removed.

POST and PUT operations should include the `Content-Type` set to `application/json` along with your API key, like so:

`Content-Type: application/json OSDI-API-Token: your_api_key_here`

To delete resources, use DELETE. Generally, you delete on endpoints identifying individual resources, not endpoints associated with collections of resources. Only some resources are delete-able. For examples, see the documentation on individual resources.

[Back To Top ↑](#can_top)

#### Searching and filtering (OData)

The Action Network API supports basic filtering using a small subset of the [OData query language](http://www.odata.org/).

The use cases we generally support have to do with finding individual resources by identifying characteristics, or finding collections of newly created or updated resources. This facilitates updating specific resources and syncing data between systems.

OData queries are url arguments and take the format `?filter=field_name operator 'value'`.

The following operations are supported:

**Operations**

| Name | Description | Example |
| --- | --- | --- |
| eq | Exact match | ?filter=identifier eq 'action_network:fbce520b-12fa-437e-bd8c-f89310fdc005' |
| gt | Greater than | ?filter=modified_date gt '2014-03-25' |
| lt | Less than | ?filter=modified_date lt '2014-03-25' |

The following field names can be used for filtering on specific resources:

**Resources and supported field names**

| Resource | Field Names Supported |
| --- | --- |
| people | identifier, created_date, modified_date, family_name, given_name, email_address, phone_number, region, postal_code |
| petitions, forms, fundraising_pages, event_campaigns, campaigns, surveys, advocacy_campaigns | identifier, created_date, modified_date, origin_system, title |
| events | identifier, created_date, modified_date, origin_system, title, start_date, end_date |
| signatures, attendances, submissions, donations, outreaches, responses | identifier, created_date, modified_date |

[Back To Top ↑](#can_top)

#### Background Processing and Queueing

The Action Network API supports background processing on some endpoints. This is helpful for heavy operations where you could exceed the rate limit or where you don't need the results immediately.

Append `background_request=true` to your request URL as a URL argument to enable background processing. This will return an immediate success, with an empty JSON body, and send your request to the background queue for eventual processing.

Background processing is available on the following operations:

| Resource | Operation |
| --- | --- |
| Attendances | POST, PUT, record attendance helper |
| Donations | POST, PUT, record donation helper |
| Outreaches | POST, PUT, record outreach helper |
| People | PUT, person signup helper |
| Signatures | POST, PUT, record signature helper |
| Submissions | POST, PUT, record submission helper |
| Responses | POST, PUT, record response helper |
| Taggings | POST, DELETE |

Here is an example of a POST people operation on with background processing enabled:

**Request**

`POST https://actionnetwork.org/api/v2/people?background_request=true  Header: Content-Type: application/json OSDI-API-Token: your_api_key_here`

`{   "person" : {     "family_name" : "Smith",     "given_name" : "John",     "postal_addresses" : [ { "postal_code" : "20009" }],     "email_addresses" : [ { "address" : "jsmith@mail.com" }],     "phone_numbers": [ {"number": "2021234444" }]    },   "add_tags": [     "volunteer",     "member"   ] }`

**Response**

`200 OK {}`
