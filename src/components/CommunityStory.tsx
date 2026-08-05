import Image from "next/image";

export type CommunityStory = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  topics: string[];
  organisation: string;
  state: string;
  publishedLabel: string;
  content: string[];
  imageSrc?: string;
};

type CommunityStoryProps = {
  story: CommunityStory;
};

/**
 * Presentation structures for approved public stories. They remain unused until
 * the Network has confirmed publication approval and public-use permissions.
 */
export function CommunityStoryCard({ story }: CommunityStoryProps) {
  return (
    <article className="community-story-card">
      {story.imageSrc ? (
        <Image
          src={story.imageSrc}
          alt=""
          className="community-story-card-image"
          width={720}
          height={440}
        />
      ) : null}
      <div className="community-story-card-body">
        <p className="community-story-card-category">{story.category}</p>
        <h3>{story.title}</h3>
        <p>{story.summary}</p>
        <div className="community-story-card-meta">
          <span>{story.organisation}</span>
          <span>{story.state}</span>
          <span>{story.publishedLabel}</span>
        </div>
      </div>
    </article>
  );
}

export function CommunityStoryDetail({ story }: CommunityStoryProps) {
  return (
    <article className="community-story-detail">
      <header>
        <p className="community-story-card-category">{story.category}</p>
        <h1>{story.title}</h1>
        <p className="community-story-detail-summary">{story.summary}</p>
        <div className="community-story-card-meta">
          <span>{story.organisation}</span>
          <span>{story.state}</span>
          <span>{story.publishedLabel}</span>
        </div>
      </header>
      {story.imageSrc ? (
        <Image
          src={story.imageSrc}
          alt=""
          className="community-story-detail-image"
          width={1440}
          height={840}
        />
      ) : null}
      <div className="community-story-detail-body">
        {story.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
