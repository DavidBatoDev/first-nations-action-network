type NetworkWelcomeProps = {
  /** Section classes, so each page sets its own background. */
  className?: string;
};

/**
 * The "What is the Network" statement.
 *
 * Shared by Who We Are and Contribute so a copy edit cannot land on only one
 * of the two pages.
 */
export default function NetworkWelcome({
  className = "sec",
}: NetworkWelcomeProps) {
  return (
    <section className={className}>
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="kicker">What is the Network</span>
          <h2>Welcome to the First Nations Action Network</h2>
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
