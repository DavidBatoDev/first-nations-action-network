/** The checkmark used inside the round "tick" badges throughout the site. */
export function Tick({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** The animated "→" used in buttons and text links. */
export function Arrow() {
  return <span className="arrow">→</span>;
}
