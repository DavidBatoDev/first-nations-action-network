/**
 * Legend pinned to the top-left of the map stage.
 * Icons mirror what is actually drawn in the scene.
 */
export default function MapLegend({ networks, organisations }: {
  networks: number;
  organisations: number;
}) {
  return (
    <div className="map3d-legendbox" aria-label="Map legend">
      <p className="map3d-legendbox-title">
        {networks} networks · {organisations} organisations
      </p>
      <ul>
        <li>
          <svg viewBox="0 0 34 46" aria-hidden="true" className="legend-pin">
            <path d="M17 45.5 L9.8 27 L24.2 27 Z" fill="var(--ochre-deep)" />
            <circle cx="17" cy="17" r="12.5" fill="var(--ochre)" stroke="var(--ochre-deep)" strokeWidth="1.5" />
            <circle cx="17" cy="17" r="4.6" fill="#fff6e2" />
          </svg>
          State Network
        </li>
        <li>
          <span className="legend-twinkle" aria-hidden="true" />
          Torres Strait Islands
        </li>
        <li>
          <svg viewBox="0 0 24 8" aria-hidden="true" className="legend-dash">
            <line x1="1" y1="4" x2="23" y2="4" strokeDasharray="5 4" />
          </svg>
          State borders
        </li>
        <li className="map3d-legendbox-hint">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="legend-graph">
            <line x1="12" y1="12" x2="4" y2="5" />
            <line x1="12" y1="12" x2="20" y2="7" />
            <line x1="12" y1="12" x2="7" y2="20" />
            <circle cx="12" cy="12" r="3" />
            <circle cx="4" cy="5" r="2.4" />
            <circle cx="20" cy="7" r="2.4" />
            <circle cx="7" cy="20" r="2.4" />
          </svg>
          Click a state to show groups.
        </li>
      </ul>
    </div>
  );
}
