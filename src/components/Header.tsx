"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full px-4 md:px-12 transition-all duration-500 flex items-center justify-between",
        isScrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-3 shadow-xl"
          : "bg-transparent py-5",
      )}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          href="/"
          className="text-red-600 text-xl md:text-3xl font-black tracking-tighter uppercase link-hover shrink-0"
          aria-label="GeminiTV Home"
        >
          STREAMING
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-3 md:gap-6 text-[10px] sm:text-xs md:text-sm text-zinc-300 font-medium uppercase tracking-wider md:normal-case md:tracking-normal">
            <li>
              <Link href="/" className="hover:text-white text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">
                Movies
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center">
        <button
          aria-label="Search movies"
          className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-2"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
};
