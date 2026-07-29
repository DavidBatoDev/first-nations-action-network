import type { ResourceCourse } from "@/components/ResourceCourse";

export const RESOURCE_COURSES: ResourceCourse[] = [
  {
    slug: "starting-a-community-campaign",
    title: "Starting a Community Campaign",
    summary:
      "A practical, step-by-step guide to planning and launching a campaign that builds momentum.",
    kind: "Guide",
    durationMinutes: 95,
    sections: [
      {
        id: "campaign-foundations",
        title: "Campaign foundations",
        lessons: [
          {
            id: "define-the-change",
            title: "Define the change",
            durationMinutes: 18,
            content: [
              {
                type: "video",
                title: "Begin with a clear community outcome",
                durationMinutes: 8,
              },
              {
                type: "paragraph",
                text: "Start by naming the change the community wants to see. A useful outcome is specific enough to guide decisions while leaving room for community knowledge and leadership to shape the work.",
              },
              {
                type: "paragraph",
                text: "Write the outcome in plain language, identify who is affected, and record what would be different if the campaign succeeds.",
              },
            ],
          },
          {
            id: "listen-and-map",
            title: "Listen and map the community",
            durationMinutes: 22,
            content: [
              {
                type: "video",
                title: "Map relationships before activities",
                durationMinutes: 9,
              },
              {
                type: "paragraph",
                text: "Community campaigns grow through relationships. Map the people, organisations and informal leaders connected to the issue, then identify where listening and trust-building need to happen first.",
              },
            ],
          },
        ],
      },
      {
        id: "campaign-action",
        title: "From plan to action",
        lessons: [
          {
            id: "build-the-plan",
            title: "Build the campaign plan",
            durationMinutes: 30,
            content: [
              {
                type: "video",
                title: "Turn an outcome into practical actions",
                durationMinutes: 12,
              },
              {
                type: "paragraph",
                text: "Choose actions that move people from awareness to participation. Give each action an owner, a timeframe and a clear signal that shows whether it is helping the campaign progress.",
              },
            ],
          },
          {
            id: "sustain-momentum",
            title: "Sustain momentum",
            durationMinutes: 25,
            content: [
              {
                type: "paragraph",
                text: "Keep supporters informed between major moments. Share progress, celebrate contributions and create regular opportunities for people to take part without overloading the same volunteers.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "why-connection-sustains-change",
    title: "Why Connection Sustains Change",
    summary:
      "Reflections on how relationships and belonging keep communities engaged for the long term.",
    kind: "Article",
    durationMinutes: 35,
    sections: [
      {
        id: "connection",
        title: "Connection and participation",
        lessons: [
          {
            id: "belonging-before-action",
            title: "Belonging before action",
            durationMinutes: 15,
            content: [
              {
                type: "video",
                title: "Why people stay involved",
                durationMinutes: 6,
              },
              {
                type: "paragraph",
                text: "People are more likely to stay involved when they feel known, valued and connected to others. Participation becomes sustainable when relationships are treated as part of the work rather than a step before the work.",
              },
            ],
          },
          {
            id: "shared-leadership",
            title: "Practise shared leadership",
            durationMinutes: 20,
            content: [
              {
                type: "paragraph",
                text: "Shared leadership creates more ways for people to contribute. It also reduces pressure on individual organisers and helps community knowledge travel through the group.",
              },
              {
                type: "paragraph",
                text: "Make responsibilities visible, invite new people into meaningful roles and create time to reflect together on what the group is learning.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "engagement-planning-template",
    title: "Engagement Planning Template",
    summary:
      "A ready-to-use template to map supporters, plan outreach and track community participation.",
    kind: "Tool",
    durationMinutes: 50,
    sections: [
      {
        id: "prepare-the-template",
        title: "Prepare the template",
        lessons: [
          {
            id: "map-supporters",
            title: "Map supporters and relationships",
            durationMinutes: 20,
            content: [
              {
                type: "video",
                title: "Set up your engagement map",
                durationMinutes: 7,
              },
              {
                type: "paragraph",
                text: "List the people and groups connected to the work, how they are currently involved and the relationships that can support respectful outreach.",
              },
            ],
          },
          {
            id: "plan-touchpoints",
            title: "Plan meaningful touchpoints",
            durationMinutes: 15,
            content: [
              {
                type: "paragraph",
                text: "Plan contact around what people need to know, how they prefer to participate and who is best placed to reach out. Record a purpose and next step for each touchpoint.",
              },
            ],
          },
          {
            id: "review-participation",
            title: "Review participation",
            durationMinutes: 15,
            content: [
              {
                type: "paragraph",
                text: "Use the template as a learning tool. Review who is participating, who may be missing and which approaches are building stronger relationships over time.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getResourceCourse(slug: string) {
  return RESOURCE_COURSES.find((course) => course.slug === slug);
}
