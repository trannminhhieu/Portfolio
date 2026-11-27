import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import "./Frisbee.css";

export type Chapter = {
  year: string;
  title: string;
  text: string;
  /**
   * Photo URL. Put photos in public/frisbee/ and use
   * `${import.meta.env.BASE_URL}frisbee/your-photo.jpg` (the site lives under
   * /Portfolio/ on GitHub Pages). Leave it out to show an empty photo frame.
   */
  image?: string;
  /** describes the photo for screen readers */
  imageAlt?: string;
};

/** The story, oldest first. PLACEHOLDERS: swap in your own years, texts and photos. */
const CHAPTERS: Chapter[] = [
  {
    year: "2020",
    title: "The first throw",
    text: "Placeholder: who first handed you a disc, where you were, and how badly (or well) that first throw went.",
  },
  {
    year: "20??",
    title: "Learning to flick",
    text: "Placeholder: the pickup games, the backhands that wobbled, the moment the forehand finally clicked.",
  },
  {
    year: "20??",
    title: "Finding a team",
    text: "Placeholder: the team you joined, the people on it, and what Spirit of the Game started to mean to you.",
  },
  {
    year: "20??",
    title: "First tournament",
    text: "Placeholder: the first tournament: the nerves, a layout you still remember, the score you'd rather forget.",
  },
  {
    year: "Now",
    title: "Still throwing",
    text: "Placeholder: where frisbee is in your life today, and what's next.",
  },
];


/**
 * My frisbee journey, told like the About section: the section is pinned
 * while you scroll and the chapters take turns in the middle of the screen.
 * A line runs down the middle; each chapter has its photo on one side of it
 * and its text on the other, switching sides every chapter (on phones the
 * line moves to the left and the text goes under the photo).
 * Each one fades in, holds, then fades out (upwards) before the next fades in;
 * the last one stays. One screen of scrolling per chapter.
 *
 * Visitors who prefer reduced motion get the chapters stacked, nothing moves.
 */
export default function Frisbee({ chapters = CHAPTERS }: { chapters?: Chapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the pin starts (section top at the top of the screen),
  // 1 when it ends (section bottom at the bottom of the screen)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = chapters.length;

  return (
    <section
      id="frisbee"
      ref={ref}
      className={reduceMotion ? "frisbee frisbee--static" : "frisbee"}
      // extra height = scroll distance: one screen per chapter
      style={reduceMotion ? undefined : { height: `${n * 100}svh` }}
    >
      <div className="frisbee__pin">
        <div className="frisbee__line" aria-hidden="true" />
        <p className="frisbee__kicker">Frisbee</p>
        <ol className="frisbee__chapters">
          {chapters.map((chapter, i) => (
            <ChapterCard
              key={i}
              chapter={chapter}
              index={i}
              count={n}
              progress={scrollYProgress}
              still={!!reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * One chapter. It owns one slice of the scroll: fades in over the first 30%,
 * holds, fades out over the last 30% (same timing as AboutMe's facts).
 * The last chapter fades in and stays.
 */
function ChapterCard({
  chapter,
  index,
  count,
  progress,
  still,
}: {
  chapter: Chapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const len = 1 / count;
  const start = index * len;
  const at = (f: number) => start + f * len; // point f (0–1) of this slice
  const last = index === count - 1;

  const opacity = useTransform(
    progress,
    [start, at(0.3), at(0.7), at(1)],
    [0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [start, at(0.3), at(0.7), at(1)],
    [24, 0, 0, last ? 0 : -24],
  );
  // hidden chapters must not catch clicks or text selection
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));

  return (
    <motion.li
      // first, third, … chapter: photo on the left, text on the right
      className={`frisbee__chapter${index % 2 === 0 ? " frisbee__chapter--flip" : ""}`}
      style={still ? undefined : { opacity, y, visibility }}
    >
      {chapter.image ? (
        <img
          className="frisbee__img"
          src={chapter.image}
          alt={chapter.imageAlt ?? ""}
          loading="lazy"
        />
      ) : (
        <div className="frisbee__img frisbee__img--empty" aria-hidden="true">
          photo
        </div>
      )}
      <div className="frisbee__body">
        <p className="frisbee__label">
          {String(index + 1).padStart(2, "0")} — <time>{chapter.year}</time>
        </p>
        <h3 className="frisbee__title">{chapter.title}</h3>
        <p className="frisbee__text">{chapter.text}</p>
      </div>
    </motion.li>
  );
}
