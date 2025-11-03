"use client";

import { useEffect, useState, useRef } from "react";
import Works from "./components/section/home/works";
import Hero from "./components/section/home/hero";
import Lenis from "lenis";
import PreLoader from "./loaders/pre-loader";
import { useLoadingStore } from "./store/useLoadingStore";
import Services from "./components/section/home/services";

const Home = () => {
  const { loading, setLoading } = useLoadingStore();

  const [showComponent, setShowComponent] = useState(false);
  const [blockInteraction, setBlockInteraction] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, duration: 1 });
    lenisRef.current = lenis;

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    setBlockInteraction(true);
    setShowComponent(false);

    const timer = setTimeout(() => {
      setShowComponent(true);
      setBlockInteraction(false);

      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PreLoader />}
      {blockInteraction && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "transparent",
            filter: "blur(10px)",
            pointerEvents: "all",
            cursor: "wait",
          }}
        />
      )}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "transparent",
            filter: "blur(10px)",
            pointerEvents: "all",
            cursor: "wait",
          }}
        />
      )}
      <div className="">
        <Hero />
        <Works />
        <Services />
      </div>
    </>
  );
};

export default Home;
