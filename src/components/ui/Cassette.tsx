import type { CSSProperties } from "react";
import "./Cassette.css";

/**
 * The tape reels in the cassette window are drawn with radial gradients made of
 * hundreds of alternating brown/maroon stops (that's what gives the fine rings).
 * Rather than writing them out by hand, build the lists here and hand them to
 * the CSS as custom properties (--tape-left / --tape-right in Cassette.css).
 */
function stripes(pairs: number) {
  return Array.from({ length: pairs }, () => "brown, maroon").join(", ");
}

const tapeStyle = {
  "--tape-left": stripes(600),
  "--tape-right": stripes(61),
} as CSSProperties;

/** Pure-CSS drawing of a mixtape labelled "Summer 95 Radio Mix!". */
export default function Cassette({ className = "" }: { className?: string }) {
  return (
    <div
      className={`cassette ${className}`.trim()}
      style={tapeStyle}
      role="img"
      aria-label="A cartoon of a cassette tape with the text 'Summer 95 Radio Mix!'"
    />
  );
}
