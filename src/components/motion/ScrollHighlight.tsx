"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Statement text whose words brighten from slate to paper as you scroll
 * (philosophy signature). Animates opacity of an overlay copy of each word,
 * so only opacity changes. Screen readers get the sentence once.
 */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} reduce={!!reduce} />
        ))}
      </span>
    </p>
  );
}

function Word({
  word,
  range,
  progress,
  reduce,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="text-slate">{word} </span>
      <motion.span className="absolute inset-0 text-paper" style={{ opacity: reduce ? 1 : opacity }}>
        {word}{" "}
      </motion.span>
    </span>
  );
}
