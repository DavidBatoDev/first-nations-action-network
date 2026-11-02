import type { Story, StoryBlock, StoryInline, StoryListItem, StorySummary } from "./story-types";
export { STORY_TAXONOMY, STORY_REGIONS } from "./story-filters";

// Imported from the supplied article DOCX files. Source prose and references are retained;
// category case and semantic layout are normalised, and organisation follows the supplied correction.
export const STORIES: Story[] = [
  {
    "slug": "indigenous-led-reform",
    "title": "Australia’s Urgent Imperative for Indigenous-Led Reform",
    "summary": "Why self-determined, community-led alternatives are essential to reforming Australia’s youth justice system.",
    "category": "Wellbeing",
    "subcategory": "Justice",
    "regions": [
      "Federal",
      "VIC",
      "QLD",
      "NSW",
      "SA",
      "WA",
      "NT",
      "TAS",
      "ACT"
    ],
    "organisation": "First Nations Action Network",
    "topics": [
      "Youth Justice"
    ],
    "image": {
      "src": "/images/stories/indigenous-led-reform.webp",
      "thumbnail": "/images/stories/indigenous-led-reform-thumb.webp",
      "alt": "First Nations dancers performing outdoors before a seated crowd.",
      "width": 1600,
      "height": 1067,
      "thumbnailWidth": 640,
      "thumbnailHeight": 426
    },
    "featuredOrder": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Across Australia, the youth justice system faces systemic failure. Indigenous children account for a disproportionate percentage of young people under youth justice supervision and in secure detention, despite representing a fraction of the total youth population. While national frameworks like the Closing the Gap strategy target a 30% reduction in Aboriginal and Torres Strait Islander youth detention rates by 2031, progress across Australia’s states and territories remains deeply fragmented."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Moving away from punitive, punitive-first policy cycles toward self-determined, community-led alternatives is not only a matter of human rights, but the clearest path to long-term public safety."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "the-statistical-reality-across-states-and-territories",
        "content": [
          {
            "text": "The Statistical Reality Across States and Territories"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The national picture masks distinct regional divergence. According to recent Australian Institute of Health and Welfare (AIHW) monitoring:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Northern Territory:",
                "bold": true
              },
              {
                "text": " First Nations youth make up over 90% of the juvenile detention population on an average night, maintaining the highest rate of youth detention in the country."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Queensland:",
                "bold": true
              },
              {
                "text": " Consistently holds the largest absolute number of young people in custody. Legislative shifts—including overrides to human rights protections to detain children in adult watch houses—have sustained high incarceration rates."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Western Australia:",
                "bold": true
              },
              {
                "text": " Struggles with crisis points at facilities like Banksia Hill and the Unit 18 adult maximum-security prison extension, drawing criticism from human rights bodies over excessive isolation and staff shortages."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Victoria and the ACT:",
                "bold": true
              },
              {
                "text": " Have made strides in shifting policies—such as raising the age of criminal responsibility or increasing diversion pathways—leading to lower overall rates of Indigenous youth in detention relative to northern jurisdictions."
              }
            ]
          }
        ]
      },
      {
        "type": "callout",
        "title": "Key national metrics",
        "items": [
          [
            {
              "text": "Over-representation: First Nations youth are ~21x more likely to be in detention than non-Indigenous youth."
            }
          ],
          [
            {
              "text": "Remand Crisis: ~80% of detained First Nations children are unsentenced (awaiting trial or bail decisions)."
            }
          ],
          [
            {
              "text": "Early Entry: Over 70% of children aged 10-13 under justice supervision are First Nations children."
            }
          ]
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "root-causes-why-punitiveness-fails",
        "content": [
          {
            "text": "Root Causes: Why Punitiveness Fails"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "A youth justice approach centered on lockups fails to address the underlying drivers of youth contact with law enforcement. Research repeatedly points to overlapping structural factors:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "content": [
              {
                "text": "Child Protection Intersections:",
                "bold": true
              },
              {
                "text": " Over 60% of First Nations youth under justice supervision have had prior interactions with child protection services."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Intergenerational Trauma:",
                "bold": true
              },
              {
                "text": " Decades of forced removal policies, cultural disconnection, and socioeconomic disadvantage compound family stress."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Neurodevelopmental & Health Needs:",
                "bold": true
              },
              {
                "text": " A significant portion of young people in the justice system suffer from unaddressed cognitive disabilities, health conditions like Fetal Alcohol Spectrum Disorder (FASD), or trauma-induced mental health issues."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Bail Law Escalation:",
                "bold": true
              },
              {
                "text": " Tightened bail conditions mean children are frequently remanded for technical breaches or minor non-violent property offenses rather than serious safety threats."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "key-pillars-for-systemic-reform",
        "content": [
          {
            "text": "Key Pillars for Systemic Reform"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Legal, medical, and community advocacy groups across Australia outline four critical priority areas for systemic reform:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Raise the Minimum Age of Criminal Responsibility:",
                "bold": true
              },
              {
                "text": " International standards and medical consensus recommend raising the minimum age of criminal responsibility from 10 to at least 14 years old."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Eliminate Harmful Custodial Practices:",
                "bold": true
              },
              {
                "text": " Banning spit hoods, excessive solitary confinement, strip-searching of minors, and watch-house detentions."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Invest in First Nations-Led Solutions:",
                "bold": true
              },
              {
                "text": " Redirecting corrections budgets toward Indigenous-designed early intervention, justice reinvestment models, and night patrols that re-engage youth with culture, education, and family networks."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "references",
        "content": [
          {
            "text": "References"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "content": [
              {
                "text": "Australian Institute of Health and Welfare (AIHW)",
                "bold": true
              },
              {
                "text": " (2025). "
              },
              {
                "text": "Youth detention population in Australia 2025",
                "italic": true
              },
              {
                "text": ". Cat. no. JUV 140. Canberra: AIHW."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Aboriginal and Torres Strait Islander Health Performance Framework (HPF)",
                "bold": true
              },
              {
                "text": " (2023). "
              },
              {
                "text": "Measure 2.11: Contact with the criminal justice system",
                "italic": true
              },
              {
                "text": ". Australian Government."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Productivity Commission",
                "bold": true
              },
              {
                "text": " (2025). "
              },
              {
                "text": "Closing the Gap Information Repository: Dashboard Target 11 (Youth Justice)",
                "italic": true
              },
              {
                "text": ". Commonwealth of Australia."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Amnesty International Australia",
                "bold": true
              },
              {
                "text": " (2026). "
              },
              {
                "text": "Indigenous Youth Justice Campaign: Kids Need Better Report & Submissions",
                "italic": true
              },
              {
                "text": "."
              }
            ]
          },
          {
            "content": [
              {
                "text": "National Legal Aid",
                "bold": true
              },
              {
                "text": " (2024). "
              },
              {
                "text": "Submission to the Inquiry into Australia's Youth Justice and Incarceration System",
                "italic": true
              },
              {
                "text": "."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Royal Commission into the Protection and Detention of Children in the Northern Territory",
                "bold": true
              },
              {
                "text": " (2017). "
              },
              {
                "text": "Final Report",
                "italic": true
              },
              {
                "text": ". Commonwealth of Australia and Northern Territory Government."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "national-allyship-summit",
    "title": "Continued Fight: National Allyship Summit held in UNSW",
    "summary": "The National Allyship Summit at UNSW explored strategic action for Voice, Treaty and Truth after the referendum.",
    "category": "Governance",
    "subcategory": "Leadership",
    "regions": [
      "Federal",
      "VIC",
      "QLD",
      "NSW",
      "SA",
      "WA",
      "NT",
      "TAS",
      "ACT"
    ],
    "organisation": "First Nations Action Network",
    "topics": [
      "Australian Indigenous Voice referendum"
    ],
    "image": {
      "src": "/images/stories/national-allyship-summit.webp",
      "thumbnail": "/images/stories/national-allyship-summit-thumb.webp",
      "alt": "Participants attending a presentation at the National Allyship Summit at UNSW.",
      "width": 1600,
      "height": 1200,
      "thumbnailWidth": 640,
      "thumbnailHeight": 480
    },
    "featuredOrder": 2,
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The event held at UNSW on "
          },
          {
            "text": "September 18",
            "bold": true
          },
          {
            "text": " was the "
          },
          {
            "text": "National Allyship Summit",
            "bold": true
          },
          {
            "text": " (organized under the banner of "
          },
          {
            "text": "Allies for Uluru",
            "italic": true
          },
          {
            "text": " / "
          },
          {
            "text": "The Uluru Dialogue",
            "italic": true
          },
          {
            "text": ")."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "core-focus-redefining-allyship",
        "content": [
          {
            "text": "Core Focus: Redefining Allyship"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Following the outcome of the 2023 Voice referendum, the summit was designed around the theme "
          },
          {
            "text": "\"Redefining Allyship.\"",
            "bold": true
          },
          {
            "text": " Its goal was to assess where the movement stands today and map out strategic, coordinated action to support the ongoing aspirations of the Uluru Statement from the Heart (Voice, Treaty, and Truth)."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "key-presentations-themes",
        "content": [
          {
            "text": "Key Presentations & Themes"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Demographic & Cultural Analysis (George Megalogenis):",
                "bold": true
              },
              {
                "text": " Prominent political commentator and author George Megalogenis delivered an analysis examining Australia’s evolving demographics and population trends. His contribution focused on where Australia stands today social-politically and what the changing national identity means for future reform efforts."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Future Strategy & Provocation (Professor Megan Davis AC):",
                "bold": true
              },
              {
                "text": " Scientia Professor Megan Davis provided an update on the ongoing work of the Uluru Dialogue. She issued a provocation on the future role of allies, emphasizing that post-referendum allyship must evolve beyond symbolic support into strategic, high-impact, and organized civic action."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Practical Pathways Forward:",
                "bold": true
              },
              {
                "text": " The gathering brought together hundreds of in-person and online participants—including Indigenous leaders like Sally Scales—to workshop practical lessons from the referendum campaign, examine structural obstacles, and identify new pathways for community partnerships, education, and public engagement."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "key-takeaway",
        "content": [
          {
            "text": "Key Takeaway"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Rather than viewing the referendum outcome as an end, the summit framed it as a turning point requiring a modernized, disciplined allyship framework to continue driving the long-term goals of the Uluru Statement from the Heart."
          }
        ]
      }
    ]
  },
  {
    "slug": "25th-unpfii-session",
    "title": "Key Takeaways from the 25th UNPFII Session",
    "summary": "Indigenous health, protection of defenders and institutional challenges at the 25th UNPFII session.",
    "category": "Governance",
    "subcategory": "Policy",
    "regions": [
      "Global"
    ],
    "organisation": "First Nations Action Network",
    "topics": [
      "United Nations Permanent Forum on Indigenous Issues"
    ],
    "image": {
      "src": "/images/stories/25th-unpfii-session.webp",
      "thumbnail": "/images/stories/25th-unpfii-session-thumb.webp",
      "alt": "Delegates gathered in the United Nations assembly hall for the Indigenous Peoples forum.",
      "width": 1200,
      "height": 783,
      "thumbnailWidth": 640,
      "thumbnailHeight": 418
    },
    "featuredOrder": 3,
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The United Nations Permanent Forum on Indigenous Issues (UNPFII) serves as an advisory body to the UN Economic and Social Council (ECOSOC), providing a central platform to address human rights, health, education, the environment, and social development for Indigenous Peoples globally."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "recent-updates-and-key-developments",
        "content": [
          {
            "text": "Recent Updates and Key Developments",
            "bold": true
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "id": "1-25th-annual-session-april-20-may-1-2026",
        "content": [
          {
            "text": "1. 25th Annual Session (April 20 – May 1, 2026)",
            "bold": true
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Main Theme:",
                "bold": true
              },
              {
                "text": " The 25th Session of the UNPFII focused on "
              },
              {
                "text": "\"Ensuring Indigenous Peoples' health, including in the context of conflict.\"",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "Key Focus Areas:",
                "bold": true
              },
              {
                "text": " Discussions centered heavily on the compounding impacts of global conflicts, territorial encroachment, and environmental degradation on the physical and mental health of Indigenous communities."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Side Events & Media Zone:",
                "bold": true
              },
              {
                "text": " Side events highlighted escalating threats against Indigenous land and environmental defenders, with a focus on criminalization and violence targeting Indigenous women. The Secretariat and civil society partners also organized the "
              },
              {
                "text": "Indigenous Media Zone",
                "italic": true
              },
              {
                "text": " to allow journalists and platforms to report on proceedings using Indigenous worldviews and languages, in alignment with the ongoing International Decade of Indigenous Languages (2022–2032)."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "id": "2-institutional-challenges-budget-travel-constraints",
        "content": [
          {
            "text": "2. Institutional Challenges: Budget & Travel Constraints",
            "bold": true
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Impact of UN Funding Shortfalls:",
                "bold": true
              },
              {
                "text": " Broader financial crises within the United Nations system—exacerbated by unpaid dues from major member states—severely impacted the operations of the Permanent Forum in 2026."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Reduced Regional Consultations:",
                "bold": true
              },
              {
                "text": " Financial cutbacks led to the scaling back of planned in-person regional consultations across the seven socio-cultural regions. These consultations were intended to inform global plans of action on Indigenous health and self-determination."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Travel Assistance & Reporting:",
                "bold": true
              },
              {
                "text": " Reductions in funding limited travel grants for Indigenous delegates from remote areas, and forced tighter page limits on official UN outcome reports."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "id": "3-core-priorities-future-work",
        "content": [
          {
            "text": "3. Core Priorities & Future Work",
            "bold": true
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Protection of Defenders:",
                "bold": true
              },
              {
                "text": " Civil society groups and members of the UN Expert Mechanism on the Rights of Indigenous Peoples (EMRIP) highlighted the critical need for community-led protection strategies for Indigenous defenders facing threats from extractive industries and land seizures."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Permanent Mandate:",
                "bold": true
              },
              {
                "text": " Delegates reaffirmed the importance of the UNPFII's mandate, emphasizing that its permanent structure ensures a continuous platform within the UN system that does not require annual mandate renewals."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "special-rapporteur-s-report-at-the-25th-session",
        "content": [
          {
            "text": "Special Rapporteur's Report at the 25th Session",
            "bold": true
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "During the 25th Session of the UNPFII in New York, the UN Special Rapporteur on the rights of Indigenous Peoples, Dr. Albert K. Barume, delivered a comprehensive address and progress update framing his mandate's latest work against escalating global threats. Aligning with the session’s primary theme—Indigenous health in the context of conflict—he emphasized that health cannot be viewed solely as access to medical care, but as a holistic right encompassing dignity, peace, cultural continuity, and self-determination over ancestral lands. He raised critical concerns over a modern geopolitical climate where international human rights standards are increasingly disregarded or actively resisted, highlighting how land grabbing, extractive projects, and violent conflict severely undermine the physical and mental well-being of Indigenous communities worldwide."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "In detailing his mandate's activities, Dr. Barume outlined ongoing thematic research into the demarcation, registration, and titling of Indigenous lands, as well as an upcoming report examining historical and contemporary violations of the sexual and reproductive health and rights of Indigenous women and girls. He stressed that state recognition must go beyond symbolic gestures to include formal legal status, territorial guarantees, and genuine institutional partnerships aligned with the UN Declaration on the Rights of Indigenous Peoples (UNDRIP). Concluding his presentation, he called on UN member states to immediately review their relationships with Indigenous Peoples to establish meaningful reconciliation framework mechanisms while defending the progress made over the mandate’s 25-year history."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "references",
        "content": [
          {
            "text": "References",
            "bold": true
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "content": [
              {
                "text": "Cultural Survival",
                "bold": true
              },
              {
                "text": " (April 2026). "
              },
              {
                "text": "The 25th Session of the UN Permanent Forum on Indigenous Issues Starts April 20!",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://www.culturalsurvival.org/news/25th-session-un-permanent-forum-indigenous-issues-starts-april-20",
                "href": "https://www.culturalsurvival.org/news/25th-session-un-permanent-forum-indigenous-issues-starts-april-20"
              }
            ]
          },
          {
            "content": [
              {
                "text": "IndigiNews / ICT",
                "bold": true
              },
              {
                "text": " (April 2026). "
              },
              {
                "text": "UN Indigenous Peoples forum impacted by ongoing funding crisis.",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://indiginews.com/news/united-nations-indigenous-peoples-forum-funding-crisis/",
                "href": "https://indiginews.com/news/united-nations-indigenous-peoples-forum-funding-crisis/"
              }
            ]
          },
          {
            "content": [
              {
                "text": "Global Coalition for the UN Declaration on the Rights of Indigenous Peoples",
                "bold": true
              },
              {
                "text": " (May 2026). "
              },
              {
                "text": "25th Session of the United Nations Permanent Forum on Indigenous Issues: Agenda Item 6 (Future Work).",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://www.declarationcoalition.com/2026/05/01/25th-session-of-the-united-nations-permanent-forum-on-indigenous-issues-agenda-item-6-future-work/",
                "href": "https://www.declarationcoalition.com/2026/05/01/25th-session-of-the-united-nations-permanent-forum-on-indigenous-issues-agenda-item-6-future-work/"
              }
            ]
          },
          {
            "content": [
              {
                "text": "Native American Rights Fund (NARF) & Colorado Law",
                "bold": true
              },
              {
                "text": " (2026). "
              },
              {
                "text": "UN Permanent Forum on Indigenous Issues 2026 Registration & Information.",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://un-declaration.narf.org/unpfii2026-registration/",
                "href": "https://un-declaration.narf.org/unpfii2026-registration/"
              }
            ]
          },
          {
            "content": [
              {
                "text": "Barume, Albert K.",
                "bold": true
              },
              {
                "text": " (May 1, 2026). "
              },
              {
                "text": "Statement by the UN Special Rapporteur on the rights of Indigenous Peoples at the 25th Session of the UNPFII.",
                "italic": true
              },
              {
                "text": " Debates Indígenas."
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://debatesindigenas.org/en/2026/05/01/statement-by-the-un-special-rapporteur-on-the-rights-of-indigenous-peoples/",
                "href": "https://debatesindigenas.org/en/2026/05/01/statement-by-the-un-special-rapporteur-on-the-rights-of-indigenous-peoples/"
              }
            ]
          },
          {
            "content": [
              {
                "text": "UN Office of the High Commissioner for Human Rights (OHCHR)",
                "bold": true
              },
              {
                "text": " (2026). "
              },
              {
                "text": "Mandate Activities & Reports: Special Rapporteur on the rights of Indigenous Peoples.",
                "italic": true
              }
            ]
          },
          {
            "content": [
              {
                "text": "https://www.ohchr.org/en/special-procedures/sr-indigenous-peoples",
                "href": "https://www.ohchr.org/en/special-procedures/sr-indigenous-peoples"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "djab-wurrung-country",
    "title": "The Ongoing Desecration of Djab Wurrung Country",
    "summary": "A call to stand with Djab Wurrung people in protecting sacred birthing Country and trees.",
    "category": "Country",
    "subcategory": "Heritage",
    "regions": [
      "VIC"
    ],
    "organisation": "First Nations Action Network",
    "topics": [
      "Birthing Trees"
    ],
    "image": {
      "src": "/images/stories/djab-wurrung-country.webp",
      "thumbnail": "/images/stories/djab-wurrung-country-thumb.webp",
      "alt": "Supporters holding a Hands Off Djab Wurrung banner beneath a large tree.",
      "width": 1024,
      "height": 1024,
      "thumbnailWidth": 640,
      "thumbnailHeight": 640
    },
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The colonial violence continues, and once again, our sacred sites are the collateral damage of a government that fundamentally refuses to listen. On October 19, 2026, VicRoads and its contractors brutally felled a 400-to-500-year-old sacred birthing tree on Djab Wurrung land, ripping a piece of our Sacred Mother from the earth. We are still dealing with the exact same recklessness and systemic disrespect for Indigenous cultures that has defined this colony since its inception."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "This was not just a tree; it was the heart of Naram Naram Tyar—Djab Wurrung women's birthing Country. The precolonial tree bore a significant cultural scar created over two centuries ago, standing as a sacred place where children were born and woven into the fabric of ancient, unbroken songlines. To destroy such a place is an act of profound violence."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The cruelty of the State was on full display. As Djab Wurrung, Gunditjmara, Yuin, and Bidjera woman Yaraan Couzens Bundle detailed, VicPol sent a swarm of riot police to deliberately interrupt a sacred ceremony taking place at the tree's base. To force their agenda, police arrested eight people, explicitly targeting and removing two brave tree sitters who were ripped from the canopy just so heavy machinery could immediately rush in and destroy the site. Authorities forced this through despite knowing a legal defense was being formed to obtain an injunction to protect the land."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "The bureaucratic betrayal behind this destruction is as corrupt as it is devastating. While the Eastern Maar Aboriginal Corporation signed off on the Cultural Heritage Management Plan for the highway duplication in March 2026, the Djab Wurrung Women’s Working Group completely rejected it. Men are making decisions and signing away women's sacred sites, and the government is using this flawed Native Title process as a weapon to bypass the matriarchs who are the custodians of Naram Naram Tyar."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "We are fed up with the lip service, the empty acknowledgments of Country, and the blatant hypocrisy of the Victorian Government. Our culture is not an obstacle to be bulldozed, and the resistance is far from over."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "A frontline camp has been set up on Djab Wurrung Country to actively resist the daily, ongoing destruction of sacred land and trees by contractors. There is an urgent open callout for support, as the movement needs more people on the ground immediately to stand with them. Supporters are asked to come to the camp and bring their friends. Anyone able to assist can email "
          },
          {
            "text": "carpooltocountry@proton.me",
            "href": "mailto:carpooltocountry@proton.me"
          },
          {
            "text": " to get the location and an up-to-date list of what to bring."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "We must stand with the Djab Wurrung people to disrupt this corrupt process, challenge this destruction on every front, and demand an absolute end to this relentless colonial violence."
          }
        ]
      }
    ]
  },
  {
    "slug": "state-and-territory-treaties",
    "title": "Victoria Leads Historic Breakthrough as State and Territory Treaties Diverge",
    "summary": "Victoria’s operational treaty framework contrasts with stalled, repealed and emerging processes across Australia.",
    "category": "Governance",
    "subcategory": "Treaty",
    "regions": [
      "Federal",
      "VIC",
      "QLD",
      "NSW",
      "SA",
      "WA",
      "NT",
      "TAS",
      "ACT"
    ],
    "organisation": "First Nations Action Network",
    "topics": [
      "Treaty"
    ],
    "image": {
      "src": "/images/stories/state-and-territory-treaties.webp",
      "thumbnail": "/images/stories/state-and-territory-treaties-thumb.webp",
      "alt": "Hands exchanging a carved wooden object at a ceremony.",
      "width": 862,
      "height": 485,
      "thumbnailWidth": 640,
      "thumbnailHeight": 360
    },
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Australia’s movement toward First Nations treaty-making has reached a major crossroads. While Victoria has made history by establishing the nation’s first formal, operational treaty framework, progress across the rest of the country remains starkly divided along state lines and political shifts."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "victoria-milestone-statewide-treaty-commences",
        "content": [
          {
            "text": "Victoria: Milestone Statewide Treaty Commences"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Victoria stands as the pioneer in Australia's treaty landscape. Following years of community consultation, legislative design, and truth-telling through the Yoorrook Justice Commission, the state has transitioned from preparation to formal execution."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "id": "key-developments-in-victoria",
        "content": [
          {
            "text": "Key Developments in Victoria"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "content": [
              {
                "text": "Statewide Treaty Execution:",
                "bold": true
              },
              {
                "text": " On 12 December 2025, Victoria’s Statewide Treaty formally commenced following a ceremonial exchange between the Victorian Government and the First Peoples’ Assembly of Victoria. This was preceded by an official parliamentary State Apology to First Peoples on 9 December 2025."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Establishment of Gellung Warl:",
                "bold": true
              },
              {
                "text": " Under the "
              },
              {
                "text": "Statewide Treaty Act 2025",
                "italic": true
              },
              {
                "text": ", the overarching governing architecture—"
              },
              {
                "text": "Gellung Warl",
                "bold": true
              },
              {
                "text": " (a Gunaikurnai phrase meaning \"tip of the spear\")—officially commenced on 1 May 2026."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Expanded Negotiations Register:",
                "bold": true
              },
              {
                "text": " The Treaty Authority, the independent body facilitating treaty negotiations, has expanded its Negotiations Register. Multiple Traditional Owner groups—including the Wurundjeri Woi-wurrung, Taungurung, Barengi Gadjin Land Council, Tati Tati, Wadi Wadi, and Wamba Wemba—have entered formal pathways to negotiate localized Traditional Owner Treaties."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Assembly Leadership:",
                "bold": true
              },
              {
                "text": " Under newly elected Co-Chairs Meriki Onus and Djaran Murray-Jackson, the First Peoples’ Assembly of Victoria serves as a permanent representative body embedded within Gellung Warl, advising cabinet ministers directly on Aboriginal affairs."
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "While Victoria’s framework is operational, local political debates persist, with conservative parties voicing opposition to state-based treaty structures ahead of upcoming state elections. Nevertheless, the existing structural legislation and regional agreements remain active."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "state-of-play-treaty-across-australia",
        "content": [
          {
            "text": "State of Play: Treaty Across Australia"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "While Victoria moves into implementation, treaty frameworks in other states and territories present a starkly contrasting landscape ranging from active consultation to complete repeal."
          }
        ]
      },
      {
        "type": "table",
        "caption": "State of Play: Treaty Across Australia",
        "headers": [
          [
            {
              "text": "State / Territory"
            }
          ],
          [
            {
              "text": "Current Treaty Status"
            }
          ],
          [
            {
              "text": "Primary Mechanism / Next Steps"
            }
          ]
        ],
        "rows": [
          [
            [
              {
                "text": "Victoria",
                "bold": true
              }
            ],
            [
              {
                "text": "Active & In Progress",
                "bold": true
              }
            ],
            [
              {
                "text": "Statewide Treaty in effect; Gellung Warl operational; local Traditional Owner negotiations underway."
              }
            ]
          ],
          [
            [
              {
                "text": "New South Wales",
                "bold": true
              }
            ],
            [
              {
                "text": "Consultation Phase",
                "bold": true
              }
            ],
            [
              {
                "text": "Treaty Commissioners Aden Ridgeway and Naomi Moran conducting statewide community talks."
              }
            ]
          ],
          [
            [
              {
                "text": "Queensland",
                "bold": true
              }
            ],
            [
              {
                "text": "Repealed / Discontinued",
                "bold": true
              }
            ],
            [
              {
                "text": "Path to Treaty Act",
                "italic": true
              },
              {
                "text": " repealed following state government change; treaty processes halted."
              }
            ]
          ],
          [
            [
              {
                "text": "Northern Territory",
                "bold": true
              }
            ],
            [
              {
                "text": "Dismantled",
                "bold": true
              }
            ],
            [
              {
                "text": "Formal treaty process officially ended in early 2025; focus shifted to local council empowerment."
              }
            ]
          ],
          [
            [
              {
                "text": "South Australia",
                "bold": true
              }
            ],
            [
              {
                "text": "Paused / Stalled",
                "bold": true
              }
            ],
            [
              {
                "text": "State Voice to Parliament established, but formal treaty talks remain stalled."
              }
            ]
          ],
          [
            [
              {
                "text": "Western Australia",
                "bold": true
              }
            ],
            [
              {
                "text": "No Formal Treaty Process",
                "bold": true
              }
            ],
            [
              {
                "text": "Focus remains on Native Title agreements (e.g., South West Native Title Settlement) rather than a state treaty framework."
              }
            ]
          ],
          [
            [
              {
                "text": "Tasmania",
                "bold": true
              }
            ],
            [
              {
                "text": "Paused",
                "bold": true
              }
            ],
            [
              {
                "text": "Early consultations stalled; no active legislative framework for treaty negotiations currently in progress."
              }
            ]
          ],
          [
            [
              {
                "text": "ACT",
                "bold": true
              }
            ],
            [
              {
                "text": "Early Exploratory Steps",
                "bold": true
              }
            ],
            [
              {
                "text": "Engagement with local Ngunnawal Traditional Owners continues on self-determination initiatives, though formal treaty legislation has not been enacted."
              }
            ]
          ]
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "id": "key-takeaways-across-the-jurisdictions",
        "content": [
          {
            "text": "Key Takeaways Across the Jurisdictions"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "content": [
              {
                "text": "New South Wales:",
                "bold": true
              },
              {
                "text": " Following the appointment of Treaty Commissioners, NSW has focused on grassroots engagement. Commissioners are gathering perspectives across urban, regional, and remote Aboriginal communities to determine what form a future agreement or framework should take."
              }
            ]
          },
          {
            "content": [
              {
                "text": "Queensland & Northern Territory:",
                "bold": true
              },
              {
                "text": " State political shifts led to significant policy reversals. Following government changes, both Queensland (late 2024) and the Northern Territory (February 2025) officially repealed their treaty legislation and dismantled their respective commissions, redirecting focus toward economic development and local municipal governance."
              }
            ]
          },
          {
            "content": [
              {
                "text": "South Australia:",
                "bold": true
              },
              {
                "text": " SA was an early pioneer with its state-level First Nations Voice to Parliament. However, broad-scale treaty negotiations have not progressed significantly beyond initial regional agreements."
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "text": "Victoria remains the sole jurisdiction with an active, legislated, and functioning treaty mechanism at both the statewide and local nation levels, highlighting a deeply fragmented national approach to First Nations self-determination agreements."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "id": "references-further-reading",
        "content": [
          {
            "text": "References & Further Reading"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "content": [
              {
                "text": "First Peoples - State Relations (Victorian Government)",
                "bold": true
              }
            ],
            "children": {
              "ordered": true,
              "items": [
                {
                  "content": [
                    {
                      "text": "Victoria's Treaty Overview & Implementation Timeline",
                      "italic": true,
                      "href": "https://www.firstpeoplesrelations.vic.gov.au/treaty"
                    }
                  ]
                },
                {
                  "content": [
                    {
                      "text": "Victoria's Statewide Treaty Preamble and Structure",
                      "italic": true,
                      "href": "https://www.firstpeoplesrelations.vic.gov.au/victorias-statewide-treaty"
                    }
                  ]
                },
                {
                  "content": [
                    {
                      "text": "Foundations for Treaty: The Treaty Negotiation Framework",
                      "italic": true,
                      "href": "https://www.firstpeoplesrelations.vic.gov.au/foundations-treaty"
                    }
                  ]
                }
              ]
            }
          },
          {
            "content": [
              {
                "text": "Treaty Authority Victoria",
                "bold": true
              }
            ],
            "children": {
              "ordered": true,
              "items": [
                {
                  "content": [
                    {
                      "text": "A Treaty for All Victorians & Joint Statements",
                      "italic": true,
                      "href": "https://treatyauthority.au/a-treaty-for-all-victorians/"
                    }
                  ]
                }
              ]
            }
          },
          {
            "content": [
              {
                "text": "Reconciliation Victoria & First Peoples' Assembly",
                "bold": true
              }
            ],
            "children": {
              "ordered": true,
              "items": [
                {
                  "content": [
                    {
                      "text": "Treaty Resources and Ally Information",
                      "italic": true,
                      "href": "https://www.reconciliationvic.org.au/treaty-resources"
                    }
                  ]
                },
                {
                  "content": [
                    {
                      "text": "Yoorrook Justice Commission Official Public Record & Key Findings",
                      "italic": true,
                      "href": "https://yoorrookjusticecommission.org.au/"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

function inlineText(content: StoryInline[]): string {
  return content.map(({ text }) => text).join("");
}

function listText(items: StoryListItem[]): string {
  return items.map((item) => [inlineText(item.content), item.children ? listText(item.children.items) : ""].join(" ")).join(" ");
}

function blockText(block: StoryBlock): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "blockquote": return inlineText(block.content);
    case "list": return listText(block.items);
    case "callout": return [block.title, ...block.items.map(inlineText)].join(" ");
    case "table": return [block.caption, ...block.headers.map(inlineText), ...block.rows.flat().map(inlineText)].join(" ");
    case "figure": return [block.alt, block.caption ? inlineText(block.caption) : ""].join(" ");
  }
}

const summaries: StorySummary[] = STORIES.map(({ content, ...story }) => ({
  ...story,
  searchText: [story.title, story.summary, story.category, story.subcategory,
    story.organisation, ...story.topics, ...story.regions, ...content.map(blockText)]
    .join(" ").toLowerCase(),
}));

export function getStory(slug: string): Story | undefined {
  return STORIES.find((story) => story.slug === slug);
}

export function getStorySummaries(): StorySummary[] {
  return summaries;
}

export function getFeaturedStories(): StorySummary[] {
  return summaries.filter((story) => story.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder! - b.featuredOrder!);
}
