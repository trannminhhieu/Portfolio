import HiCycle from "./ui/HiCycle";
import Person from "./ui/Person";
import "./Hero.css";

export default function Hero({
  tagline = "Hi there, let me tell you a bit about myself.",
}: {
  tagline?: string;
}) {
  return (
    <section className="hero">
      <Person
        background="#FFFFFF"
        height="100%"
        scale={2}
        className="hero__person"
      />
      <div className="hero__content">
        <h1 className="hero__title">
          <HiCycle /> Hieu.
        </h1>
        <p className="hero__tagline">{tagline}</p>
      </div>
      <div className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
