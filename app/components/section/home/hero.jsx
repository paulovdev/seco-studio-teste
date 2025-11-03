"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <motion.figure className="absolute inset-0 w-full h-screen overflow-hidden -z-10">
        <Image
          src={"/bg-hero.jpg"}
          width={2000}
          height={2000}
          alt=""
          className="size-full object-cover"
          priority={true}
        />
      </motion.figure>
      <div className="p-5 h-screen flex flex-col items-start justify-center">
        <h2 className="text-amber-200 text-[1.1em] font-medium tracking-[-0.05em] uppercase">
          Brand, Web & Editorial design studio
        </h2>
      </div>
    </section>
  );
};

export default Hero;
