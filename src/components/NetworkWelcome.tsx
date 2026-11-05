type NetworkWelcomeProps = {
  /** Section classes, so each page sets its own background. */
  className?: string;
  /** Section heading; Contributors uses a shorter title than the homepage. */
  heading?: string;
  /**
   * Optional background footage. When supplied the section becomes a dark video
   * band, using the same treatment as the Learning Focus band on /learn: the
   * footage sits at half opacity over black, and the copy flips to light.
   */
  video?: {
    src: string;
    poster: string;
  };
  /**
   * Optional background photograph. The section becomes a photo band with a 40%
   * black wash and light copy. It is meant to sit directly under the homepage
   * logo carousel, whose wave strip overlaps the band's top edge.
   * `mobile` is a pre-cropped portrait so small screens download a small file.
   */
  image?: {
    src: string;
    mobile: string;
  };
};

/**
 * The "What is the Network" statement.
 *
 * Shared by the homepage and Contribute so a copy edit cannot land on only
 * one of the two pages.
 */
export default function NetworkWelcome({
  className = "sec",
  heading = "Welcome to the First Nations Action Network",
  video,
  image,
}: NetworkWelcomeProps) {
  return (
    <section
      className={
        image
          ? `${className} image-band`
          : video
            ? `${className} video-band`
            : className
      }
    >
      {image && (
        <picture className="image-band-media" aria-hidden="true">
          <source media="(max-width: 768px)" srcSet={image.mobile} />
          {/* Decorative cover photo; sized by CSS, so next/image adds nothing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt="" decoding="async" />
        </picture>
      )}
      {video && (
        <div className="video-band-media" aria-hidden="true">
          <video
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
      )}
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="kicker">What is the Network</span>
          <h2>{heading}</h2>
          <p className="lead">
            A communication platform for groups and national subscribers, as
            well as a source of intelligence on their activity. An exciting and
            engaging way to connect.
          </p>
        </div>
      </div>
    </section>
  );
}
