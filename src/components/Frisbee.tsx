import { useLayoutEffect, useRef, type RefObject } from "react";
import {
  motion,
  useMotionValue,
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
 * Before the first chapter there's one more screen: a big heading (see Intro).
 * The line and the "Frisbee" label fade in as it leaves.
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
  // scroll slices: the intro, then one per chapter
  const slots = n + 1;
  const introEnd = 1 / slots;
  // line: hidden during the intro, fades in as it leaves
  const lineOpacity = useTransform(scrollYProgress, [introEnd * 0.8, introEnd], [0, 1]);
  // label: takes over from the heading's "frisbee" once that word has flown
  // into its spot (see Intro)
  const kickerOpacity = useTransform(
    scrollYProgress,
    [introEnd * HANDOVER[0], introEnd * HANDOVER[1]],
    [0, 1],
  );
  const pinRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);

  return (
    <section
      id="frisbee"
      ref={ref}
      className={reduceMotion ? "frisbee frisbee--static" : "frisbee"}
      // extra height = scroll distance: one screen for the intro and each chapter
      style={reduceMotion ? undefined : { height: `${slots * 100}svh` }}
    >
      <div className="frisbee__pin" ref={pinRef}>
        <Intro
          progress={scrollYProgress}
          end={introEnd}
          still={!!reduceMotion}
          pinRef={pinRef}
          kickerRef={kickerRef}
        />
        <motion.div
          className="frisbee__line"
          style={reduceMotion ? undefined : { opacity: lineOpacity }}
          aria-hidden="true"
        />
        <motion.p
          className="frisbee__kicker"
          ref={kickerRef}
          style={reduceMotion ? undefined : { opacity: kickerOpacity }}
        >
          Frisbee
        </motion.p>
        <ol className="frisbee__chapters">
          {chapters.map((chapter, i) => (
            <ChapterCard
              key={i}
              chapter={chapter}
              index={i}
              slot={i + 1}
              slots={slots}
              progress={scrollYProgress}
              still={!!reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The heading; its last word flies up and becomes the "Frisbee" label. */
const HEADING_LEAD = "I REALLY LOVE";
const HEADING_WORD = "FRISBEE";

/** Part of the intro's scroll (0–1) where the flying word crossfades into the label */
const HANDOVER = [0.88, 0.96] as const;

/**
 * The opening line, big. Fades in from below and holds, like AboutMe's facts.
 * Then "I really love" fades out upwards while "frisbee" shrinks and flies up
 * into the "Frisbee" label's spot, and crossfades into the label.
 * Owns the scroll from 0 to `end`.
 */
function Intro({
  progress,
  end,
  still,
  pinRef,
  kickerRef,
}: {
  progress: MotionValue<number>;
  end: number;
  still: boolean;
  /** the pinned screen: positions are measured inside it */
  pinRef: RefObject<HTMLElement | null>;
  /** the label the word flies into */
  kickerRef: RefObject<HTMLElement | null>;
}) {
  const at = (f: number) => f * end; // point f (0–1) of the intro's slice

  // the whole heading: in from below
  const opacity = useTransform(progress, [0, at(0.3)], [0, 1]);
  const y = useTransform(progress, [0, at(0.3)], [24, 0]);

  // "I really love": out upwards
  const leadOpacity = useTransform(progress, [at(0.45), at(0.65)], [1, 0]);
  const leadY = useTransform(progress, [at(0.45), at(0.65)], [0, -24]);

  // "frisbee": from its place in the heading to the label's (measured below)
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const ds = useMotionValue(1);
  const t = useTransform(progress, [at(0.5), at(0.9)], [0, 1]); // 0 = in place, 1 = at the label
  const wordX = useTransform<number, number>([t, dx], ([t, dx]) => t * dx);
  const wordY = useTransform<number, number>([t, dy], ([t, dy]) => t * dy);
  const wordScale = useTransform<number, number>([t, ds], ([t, ds]) => 1 + t * (ds - 1));
  const wordOpacity = useTransform(progress, [at(HANDOVER[0]), at(HANDOVER[1])], [1, 0]);
  // hidden once the word has handed over, so it can't catch clicks or text selection
  const visibility = useTransform(wordOpacity, (o) => (o < 0.01 ? "hidden" : "visible"));

  const wordRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const word = wordRef.current;
    const kicker = kickerRef.current;
    const pin = pinRef.current;
    if (!word || !kicker || !pin) return;
    // where the word must go and how much it must shrink so that it lands
    // exactly on the label's text; re-measured when anything changes size
    // (screen size, fonts loading)
    const measure = () => {
      const w = offsetIn(word, pin);
      const k = offsetIn(kicker, pin);
      const cs = getComputedStyle(kicker);
      const padLeft = parseFloat(cs.paddingLeft);
      const textWidth = kicker.offsetWidth - padLeft - parseFloat(cs.paddingRight);
      dx.set(k.left + padLeft + textWidth / 2 - (w.left + word.offsetWidth / 2));
      dy.set(k.top + kicker.offsetHeight / 2 - (w.top + word.offsetHeight / 2));
      ds.set(textWidth / word.offsetWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    [pin, word, kicker].forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [still, pinRef, kickerRef, dx, dy, ds]);

  if (still) {
    return <h2 className="frisbee__heading">{`${HEADING_LEAD} ${HEADING_WORD}`}</h2>;
  }

  return (
    <div className="frisbee__intro">
      <motion.h2 className="frisbee__heading" style={{ opacity, y, visibility }}>
        <motion.span className="frisbee__heading-part" style={{ opacity: leadOpacity, y: leadY }}>
          {HEADING_LEAD}
        </motion.span>{" "}
        <motion.span
          ref={wordRef}
          className="frisbee__heading-part"
          style={{ x: wordX, y: wordY, scale: wordScale, opacity: wordOpacity }}
        >
          {HEADING_WORD}
        </motion.span>
      </motion.h2>
    </div>
  );
}

/** Position of `el` inside `ancestor`, before any transforms (moves, scaling). */
function offsetIn(el: HTMLElement, ancestor: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
}

/**
 * One chapter. It owns one slice of the scroll: fades in over the first 30%,
 * holds, fades out over the last 30% (same timing as AboutMe's facts).
 * The last chapter fades in and stays.
 */
function ChapterCard({
  chapter,
  index,
  slot,
  slots,
  progress,
  still,
}: {
  chapter: Chapter;
  index: number;
  /** which scroll slice it owns (the intro has slice 0) */
  slot: number;
  slots: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const len = 1 / slots;
  const start = slot * len;
  const at = (f: number) => start + f * len; // point f (0–1) of this slice
  const last = slot === slots - 1;

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
          <time>{chapter.year}</time>
        </p>
        <h3 className="frisbee__title">{chapter.title}</h3>
        <p className="frisbee__text">{chapter.text}</p>
      </div>
    </motion.li>
  );
}
