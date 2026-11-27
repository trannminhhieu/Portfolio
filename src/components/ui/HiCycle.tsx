import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

/**
 * Cycles just the "hi" word in the hero greeting through several languages.
 * Loops continuously (unlike a one-shot preloader) since it lives in the
 * hero permanently, not just on first load.
 */
// Each entry is followed by " Hieu." in the hero, so each one means "Hello, I'm".
const words = [
  "Hi, I'm", // English
  "नमस्ते, मैं", // Hindi 
  "Hello, I'm", // English
  "Bonjour, je suis", // French
  "Ciao, sono", // Italian
  "Olá, eu sou", // Portuguese
  "やあ、私は", // Japanese 
  "안녕하세요, 저는", // Korean 
  "Hallå, jag är", // Swedish
  "Guten Tag, ich bin", // German
  "Hallo, ik ben", // Dutch
  "Xin chào, tớ là", // Vietnamese
];

const fade: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
};

export default function HiCycle({ intervalMs = 1600 }: { intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        minWidth: "3ch",
        textAlign: "left",
        verticalAlign: "bottom",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          variants={fade}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ display: "inline-block" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
