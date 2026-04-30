"use client";

import { useState } from "react";
import Graphic from "@/components/graphic";
import FlipLink from "@/components/flip-link";
import { ThemeSwitch } from "@/components/theme-toggle";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed left-3 z-50 bg-background rounded-br-[18px]"
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      <div className="relative">
        <nav>
          <div className="flex items-center gap-5 pb-3 px-4 relative">
            <Logo />
            <div className="hidden lg:flex gap-4">
              <FlipLink href="/gallery">Gallery</FlipLink>
              <FlipLink href="/about">About</FlipLink>
            </div>
            <ThemeSwitch />
          </div>
        </nav>

        {/* Mobile top safe area */}
        <div
          className="fixed top-0 left-0 w-full bg-background block lg:hidden"
          style={{ height: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
        />

        <div className="absolute left-0 -bottom-[18px] size-[18px]">
          <Graphic />
        </div>
        <div className="absolute top-0 -right-[18px] size-[18px]">
          <Graphic />
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-3 z-40 bg-background rounded-bl-[18px] lg:hidden cursor-pointer select-none"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        <div className="relative pb-3 px-4">
          <h1 className="text-sm font-light">Menu</h1>
          <Graphic className="absolute -bottom-4 right-0 rotate-90" />
          <Graphic className="absolute -left-4 top-0 rotate-90" />
        </div>
      </button>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};

export default Header;
