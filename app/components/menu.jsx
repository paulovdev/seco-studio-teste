"use client";

import { useMousePosition } from "@/app/hooks/useMousePosition";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const menuItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/about", id: "about" },
  { label: "Works", href: "/works", id: "works" },
  { label: "Contact", href: "/contact", id: "contact" },
];
const textSlideAnim = {
  open: (i) => ({
    y: "0%",
    transition: {
      duration: 0.25,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.6 + i * 0.035,
    },
  }),
  closed: (i) => ({
    y: "100%",
    transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1], delay: i * 0.035 },
  }),
};

const menuAnim = {
  open: {
    top: "0%",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    top: "-100%",
    transition: {
      duration: 0.75,
      delay: 0.6,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const overlayAnim = {
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1], type: "tween" },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.215, 0.61, 0.355, 1],
      type: "tween",
      delay: 0.4,
    },
  },
};

const Navigation = ({ setMenu, controls }) => {
  return (
    <div className="size-full flex items-center justify-center gap-8 max-lg:flex-col">
      {menuItems.map((item, i) => {
        const pathname = usePathname();
        const isActive =
          pathname === item.href ||
          (pathname.startsWith("/projects") && item.id === "projects") ||
          (pathname.startsWith("/news") && item.id === "news");

        return (
          <div
            className=" h-fit overflow-hidden flex group cursor-pointer"
            key={item.id}
          >
            <Link
              scroll={false}
              href={item.href}
              className="relative w-full uppercase"
              onClick={() => setMenu(false)}
            >
              <motion.p
                className={`text-[1em] font-medium tracking-[-0.03em] leading-none transition-all duration-500 ${
                  isActive ? "text-p" : "text-p/50"
                }`}
                variants={textSlideAnim}
                animate={controls}
                custom={i}
              >
                {item.label}
              </motion.p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const Menu = ({ menu, setMenu }) => {
  /*   const { x, y } = useMousePosition();
  const [hovered, setHovered] = useState(null); */
  const controls = useAnimationControls();

  useEffect(() => {
    if (menu) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [menu]);

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 w-screen h-dvh bg-s z-100 will-change-transform "
        variants={menuAnim}
        initial={false}
        animate={menu ? "open" : "closed"}
      >
        <Navigation menu={menu} setMenu={setMenu} controls={controls} />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-p/50 backdrop-blur-[26px] z-90 will-change-auto max-lg:w-screen"
        style={{ pointerEvents: menu ? "auto" : "none" }}
        variants={overlayAnim}
        animate={menu ? "open" : "closed"}
        initial="closed"
      />

      {/*   <AnimatePresence mode="sync">
        {hovered && menu && (
          <motion.div
            className="fixed w-30 h-30 bg-s rounded-full flex items-center justify-center z-1000"
            style={{
              left: x,
              top: y,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <motion.div className="size-full flex items-center justify-center group">
              <GrClose size={32} className=" text-p" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default Menu;
