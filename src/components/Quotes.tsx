import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./Quotes.css";

export type QuotesProps = {
  quote?: string;
  /** who said it; leave empty to show no author line */
  author?: string;
};

/**
 * A quote in handwriting with a highlighter stroke that follows the scroll:
 * it sweeps over the text as the quote moves up into the middle of the
 * screen, and goes back when you scroll back up (see .quote__text in Quotes.css).
 *
 * PLACEHOLDER: swap the default quote and author for your own.
 */
export default function Quotes({
  quote = "I love what I'm doing, hope you like it too.",
  author = "Someone wise",
}: QuotesProps) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the quote's top comes up past 85% of the screen's height,
  // 1 when its middle reaches the middle of the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.5"],
  });
  // how much of the text the highlighter has covered
  const highlight = useTransform(scrollYProgress, (p) => `${p * 100}% 100%`);

  return (
    <section id="quotes" className="quote">
      <figure className="quote__figure">
        <blockquote ref={ref} className="quote__block">
          <motion.p
            className="quote__text"
            // reduced motion: fully highlighted from the start
            style={{ backgroundSize: reduceMotion ? "100% 100%" : highlight }}
          >
            {quote}
          </motion.p>
        </blockquote>
        {author && <figcaption className="quote__author">— {author}</figcaption>}
      </figure>
    </section>
  );
}
