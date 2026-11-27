import type { CSSProperties } from "react";
import "./SolarSystem.css";

/**
 * Decorative animated solar system: the sun, four planets on dashed orbits,
 * and a moon circling Earth. Pure CSS; 780×780 at scale 1.
 */
export default function SolarSystem({
  scale = 1,
  className = "",
}: {
  /** Size multiplier (1 = 780px wide, 0.5 = half) — scales around the center */
  scale?: number;
  className?: string;
}) {
  return (
    <div
      className={`solar ${className}`.trim()}
      style={{ "--solar-scale": scale } as CSSProperties}
      aria-hidden="true"
    >
      <div className="solar__sun" />

      <div className="solar__orbit solar__orbit--mercury" />
      <div className="solar__spin solar__spin--mercury">
        <div className="solar__planet solar__planet--mercury" />
      </div>

      <div className="solar__orbit solar__orbit--venus" />
      <div className="solar__spin solar__spin--venus">
        <div className="solar__planet solar__planet--venus" />
      </div>

      <div className="solar__orbit solar__orbit--earth" />
      <div className="solar__spin solar__spin--earth">
        <div className="solar__orbit solar__orbit--moon" />
        <div className="solar__spin solar__spin--moon">
          <div className="solar__planet solar__planet--moon" />
        </div>
        <div className="solar__planet solar__planet--earth" />
      </div>

      <div className="solar__orbit solar__orbit--mars" />
      <div className="solar__spin solar__spin--mars">
        <div className="solar__planet solar__planet--mars" />
      </div>
    </div>
  );
}
