import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type {
  Story,
  StoryBlock,
  StoryInline,
  StoryListItem,
  StoryRegion,
  StorySummary,
} from "@/lib/story-types";

function InlineContent({ content }: { content: readonly StoryInline[] }) {
  return content.map((part, index) => {
    let text: ReactNode = part.text;
    if (part.italic) text = <em>{text}</em>;
    if (part.bold) text = <strong>{text}</strong>;
    if (part.href && /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(part.href)) {
      text = <a href={part.href}>{text}</a>;
    }
    return <Fragment key={index}>{text}</Fragment>;
  });
}

function StoryList({
  ordered,
  items,
}: {
  ordered: boolean;
  items: readonly StoryListItem[];
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <List>
      {items.map((item, index) => (
        <li key={index}>
          <InlineContent content={item.content} />
          {item.children ? <StoryList {...item.children} /> : null}
        </li>
      ))}
    </List>
  );
}

function StoryContentBlock({ block, index }: { block: StoryBlock; index: number }) {
  switch (block.type) {
    case "paragraph":
      return <p><InlineContent content={block.content} /></p>;
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return <Heading id={block.id}><InlineContent content={block.content} /></Heading>;
    }
    case "list":
      return <StoryList ordered={block.ordered} items={block.items} />;
    case "table": {
      const captionId = `story-table-${index}`;
      return (
        <div className="story-article-table" role="region" aria-labelledby={captionId} tabIndex={0}>
          <table>
            <caption id={captionId}>{block.caption}</caption>
            <thead>
              <tr>
                {block.headers.map((header, cellIndex) => (
                  <th scope="col" key={cellIndex}><InlineContent content={header} /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}><InlineContent content={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "callout":
      return (
        <aside className="story-article-callout" aria-labelledby={`story-callout-${index}`}>
          <h3 id={`story-callout-${index}`}>{block.title}</h3>
          <ul>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}><InlineContent content={item} /></li>
            ))}
          </ul>
        </aside>
      );
    case "blockquote":
      return <blockquote><p><InlineContent content={block.content} /></p></blockquote>;
    case "figure":
      return (
        <figure>
          <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 360px) calc(100vw - 36px), (max-width: 640px) calc(100vw - 48px), (max-width: 840px) calc(100vw - 96px), 760px" />
          {block.caption ? <figcaption><InlineContent content={block.caption} /></figcaption> : null}
        </figure>
      );
  }
}

function conciseRegions(regions: readonly StoryRegion[]) {
  return regions.includes("Federal")
    ? ["Federal", ...(regions.includes("Global") ? ["Global"] : [])].join(" · ")
    : regions.join(" · ");
}

export function CommunityStoryRow({ story }: { story: StorySummary }) {
  const titleId = `story-title-${story.slug}`;
  return (
    <article className="story-row">
      <Link className="story-row-link" href={`/stories/${story.slug}`} aria-labelledby={titleId}>
        <Image
          className="story-row-image"
          src={story.image.thumbnail}
          alt=""
          width={story.image.thumbnailWidth}
          height={story.image.thumbnailHeight}
          sizes="(max-width: 359px) 88px, (max-width: 640px) 104px, (max-width: 900px) 180px, 240px"
        />
        <div className="story-row-heading">
          <p className="story-row-category">{story.category} <span aria-hidden="true">/</span> {story.subcategory}</p>
          <h3 id={titleId}>{story.title}</h3>
        </div>
        <p className="story-row-summary">{story.summary}</p>
        <div className="story-row-foot">
          <span>{conciseRegions(story.regions)}</span>
          <span className="story-row-read">Read story <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  );
}

export function CommunityStoryDetail({ story }: { story: Story }) {
  return (
    <article className="story-article">
      <div className="wrap">
      <header className="story-article-header">
        <p className="story-article-category">{story.category} <span aria-hidden="true">/</span> {story.subcategory}</p>
        <h1>{story.title}</h1>
        <p className="story-article-summary">{story.summary}</p>
        <dl className="story-article-meta">
          <div><dt>Organisation</dt><dd>{story.organisation}</dd></div>
          <div><dt>Region</dt><dd>{conciseRegions(story.regions)}</dd></div>
        </dl>
      </header>
      <Image
        className="story-article-image"
        src={story.image.src}
        alt={story.image.alt}
        width={story.image.width}
        height={story.image.height}
        sizes="(max-width: 360px) calc(100vw - 36px), (max-width: 640px) calc(100vw - 48px), (max-width: 1240px) calc(100vw - 96px), 1144px"
        preload
      />
      </div>
      <div className="wrap">
      <div className="story-article-body">
        {story.content.map((block, index) => <StoryContentBlock block={block} index={index} key={index} />)}
      </div>
      <div className="story-article-end"><Link href="/stories">← All stories</Link></div>
      </div>
    </article>
  );
}
