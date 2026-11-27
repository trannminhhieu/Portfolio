import Person from "./ui/Person";
import "./AboutMe.css";

type Fact = {
  label: string;
  value: string;
};

export type AboutMeProps = {
  fullName?: string;
  birthplace?: string;
  school?: string;
};

/**
 * Big, simple self-introduction. The section is pinned while you scroll and
 * the facts take turns in the same spot: each one fades in as the previous
 * one fades out. The animation is pure CSS (see AboutMe.css).
 */
export default function AboutMe({
  fullName = "Tran Minh Hieu",
  birthplace = "Ho Chi Minh City",
  school = "Vietnamese-German University",
}: AboutMeProps) {
  const facts: Fact[] = [
    { label: "Hi, my name is", value: fullName },
    { label: "I was born in a lovely city called", value: birthplace },
    { label: "I've done my Bachelor in", value: school },
  ];

  return (
    <section id="about" className="about">
      <div className="about__pin">
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
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
