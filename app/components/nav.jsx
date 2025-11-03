"use client";

import Link from "next/link";
import Menu from "./menu";
import { useState } from "react";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [overlayTime, setOverlayTime] = useState(null);

  return (
    <>
      <header className="w-full">
        <nav className="fixed z-100 top-0 right-0 left-0 p-2 px-3 backdrop-blur-[6px] border-b border-black flex items-center justify-between">
          <Link
            href={"/"}
            className="text-p text-[1em] font-medium tracking-[-0.03em]"
          >
            TESTE STUDIO
          </Link>
        </nav>

        <div className="cursor-pointer" onClick={() => setMenu(!menu)}>
          <button className="fixed right-9 top-2 text-p text-[1em] tracking-[-0.03em] font-medium uppercase z-100 cursor-pointer max-md:hidden">
            MENU
          </button>
          <button
            className={`fixed right-3 top-3 rounded-full bg-p z-999! cursor-pointer ${
              menu ? "w-7 h-7" : "w-3.5 h-3.5 delay-300"
            } transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)`}
          />
        </div>
      </header>

      <Menu
        menu={menu}
        setMenu={setMenu}
        overlayTime={overlayTime}
        setOverlayTime={setOverlayTime}
      />
    </>
  );
};

export default Nav;
