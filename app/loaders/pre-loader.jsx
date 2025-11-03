"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/app/store/useLoadingStore";

const horizontalAnimation = {
  initial: {
    top: "0%",
  },

  enter: {
    top: "100%",

    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 2.3,
    },
    transitionEnd: { top: "0%", width: 0, opacity: 0 },
  },
};
const arrayTextSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.25 + i * 0.025,
    },
  }),
  exit: {
    y: "100%",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: [0.73, 1, 0.68, 1],
    },
  },
};

export default function PreLoader({ children }) {
  const { loading, setLoading } = useLoadingStore();

  const textControls = useAnimation();

  const text = "We're not just here to make things look pretty.";

  useEffect(() => {
    async function runSequence() {
      await textControls.start("animate");
      await textControls.start("exit");
    }

    runSequence();
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-dvh flex z-1000 pointer-events-none select-none overflow-hidden ${
          loading ? "cursor-auto" : "cursor-wait"
        }`}
      >
        <motion.div
          variants={horizontalAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
          className="absolute w-screen h-screen bg-[#F2F3EC] z-100"
          onAnimationComplete={() => setLoading(false)}
        />

        <AnimatePresence mode="wait">
          <div className="absolute p-5 size-full flex flex-col items-center justify-center z-100">
            <div className="overflow-hidden h-5 flex">
              {text.split("").map((letter, i) => (
                <motion.h1
                  key={i}
                  className="text-p text-[1.1em] font-medium tracking-[-0.04em] leading-none"
                  variants={arrayTextSlideAnim}
                  initial="initial"
                  animate={textControls}
                  custom={i}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.h1>
              ))}
            </div>
          </div>
        </AnimatePresence>
      </div>

      {children}
    </>
  );
}
