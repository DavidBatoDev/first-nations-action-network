export type ActionKind = "Petition" | "Survey";

export type CommunityAction = {
  id: string;
  kind: ActionKind;
  title: string;
  description?: string;
  actionUrl: string;
  /** total_signatures for petitions, total_responses for surveys. */
  supporterCount?: number;
};

export type ActionFeedStatus = "ready" | "unconfigured" | "error";

export type ActionFeed = {
  actions: CommunityAction[];
  status: ActionFeedStatus;
};
