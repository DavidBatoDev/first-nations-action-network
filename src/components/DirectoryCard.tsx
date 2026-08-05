import Image from "next/image";

export type DirectoryListing = {
  name: string;
  description: string;
  state: string;
  organisationType: string;
  focusAreas: string[];
  logoUrl?: string;
};

type DirectoryCardProps = {
  listing: DirectoryListing;
};

/**
 * Presentation structure for approved public directory listings.
 * It is intentionally not rendered until the Network has verified seed data and
 * public-listing permission for each organisation.
 */
export default function DirectoryCard({ listing }: DirectoryCardProps) {
  return (
    <article className="directory-card">
      <div className="directory-card-heading">
        {listing.logoUrl ? (
          <Image
            src={listing.logoUrl}
            alt=""
            className="directory-card-logo"
            width={46}
            height={46}
          />
        ) : null}
        <div>
          <p className="directory-card-type">{listing.organisationType}</p>
          <h3>{listing.name}</h3>
        </div>
      </div>
      <p className="directory-card-description">{listing.description}</p>
      <div className="directory-card-meta">
        <span>{listing.state}</span>
        {listing.focusAreas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>
    </article>
  );
}
