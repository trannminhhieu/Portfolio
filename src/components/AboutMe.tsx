import type { CSSProperties, MouseEvent } from "react";
import Person from "./ui/Person";
import SolarSystem from "./ui/SolarSystem";
import "./AboutMe.css";

type Fact = {
  label: string;
  value: string;
  /** if set, the value becomes a link to this URL */
  href?: string;
  /** draw the value in horizontal color bands (see StripedText) */
  striped?: boolean;
};

export type AboutMeProps = {
  fullName?: string;
  birthplace?: string;
  school?: string;
  schoolUrl?: string;
};

/**
 * Big, simple self-introduction. The section is pinned while you scroll and
 * the facts take turns in the same spot: each one fades in as the previous
 * one fades out. The animation is pure CSS (see AboutMe.css).
 */
export default function AboutMe({
  fullName = "Tran Minh Hieu",
  birthplace = "EARTH",
  school = "Vietnamese-German University",
  schoolUrl = "https://vgu.edu.vn",
}: AboutMeProps) {
  const facts: Fact[] = [
    { label: "Hi, my name is", value: fullName },
    { label: "I was born in a lovely place called", value: birthplace, striped: true },
    { label: "I've done my Bachelor in", value: school, href: schoolUrl },
  ];

  return (
    <section id="about" className="about">
      <div className="about__pin">
        {/* decorative: centered on the screen, fades in and out with the birthplace */}
        <div className="about__solar">
          <SolarSystem scale={1} />
        </div>

        {/* decorative: slides in from the right while the name appears */}
        <div className="about__person" aria-hidden="true">
          <Person background="transparent" height="100%" scale={2.5} rotate={-30} />
        </div>

        <p className="about__kicker">About me</p>

        <dl className="about__facts">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`about__fact about__fact--${i + 1}`}
            >
              <dt className="about__label">
                {String(i + 1).padStart(2, "0")} — {fact.label}
              </dt>
              <dd className="about__value">
                {fact.href ? (
                  <EchoLink href={fact.href}>{fact.value}</EchoLink>
                ) : fact.striped ? (
                  <StripedText>{fact.value}</StripedText>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * Color bands of the striped text, top to bottom. Each copy of the text is cut
 * off at `height`; copies higher up sit on top, so each shows as one band.
 * The text itself (blue, see .about__stripes) shows below the last band.
 */
const STRIPES = [
  { color: "#d61c5b", height: "34%" }, // pink
  { color: "#f1573f", height: "50%" }, // red
  { color: "#feb213", height: "66%" }, // orange
  { color: "#6abc4e", height: "80%" }, // green
];

/**
 * Text drawn in horizontal color bands: colored copies, each cut off at a
 * different height, stacked on top of the text (see .about__stripe).
 */
function StripedText({ children }: { children: string }) {
  return (
    <span className="about__stripes">
      {children}
      {STRIPES.map((stripe, i) => (
        <span
          key={stripe.color}
          className="about__stripe"
          aria-hidden="true"
          style={{ color: stripe.color, height: stripe.height, zIndex: STRIPES.length - i }}
        >
          {children}
        </span>
      ))}
    </span>
  );
}

/**
 * Colors of the copies that fan out behind the link text on hover, front to
 * back: the German flag (black, red, gold), in the flag's top-to-bottom order.
 */
const ECHO_COLORS = ["#000000", "#dd0000", "#ffce00"];

/**
 * Link whose text gets colored copies stacked behind it on hover. The copies
 * tilt and shift with the mouse, the ones further back more and more slowly
 * (see .about__echo in AboutMe.css).
 */
function EchoLink({ href, children }: { href: string; children: string }) {
  // mouse position inside the link, from -0.5 (left/top) to 0.5 (right/bottom)
  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  }

  function handleLeave(e: MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  }

  return (
    <a
      className="about__link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="about__link-text">{children}</span>
      {ECHO_COLORS.map((color, i) => (
        <span
          key={color}
          className="about__echo"
          aria-hidden="true"
          style={{ "--k": i + 1, color } as CSSProperties}
        >
          {children}
        </span>
      ))}
    </a>
  );
}
