"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { MovieModal } from "./MovieModal";
import { Movie } from "@/types/api";
import { useWatchHistory } from "@/hooks/useWatchHistory";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const { history } = useWatchHistory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({ left: el.scrollLeft + e.deltaY * 2, behavior: "auto" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByButton = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleCardClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  return (
    <section className="relative px-4 md:px-12 py-4">
      <h2 className="text-xl font-semibold mb-4 text-zinc-100 tracking-tight px-1">
        {title}
      </h2>

      <div className="relative group/row">
        <button
          onClick={() => scrollByButton("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 items-center justify-center bg-black/0 hover:bg-black/60 text-white transition-all hidden md:flex cursor-pointer group/btn-left rounded-l-lg"
          aria-label="Scroll Left"
        >
          <ChevronLeft
            className="opacity-0 group-hover/btn-left:opacity-100 transition-opacity duration-300 scale-125"
            size={44}
            strokeWidth={3}
          />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleCardClick(movie)}
              progress={history[movie.id]?.progress ?? 0}
            />
          ))}
          <div className="flex-none w-4 md:w-12" />
        </div>

        <button
          onClick={() => scrollByButton("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 items-center justify-center bg-black/0 hover:bg-black/60 text-white transition-all hidden md:flex cursor-pointer group/btn-right rounded-r-lg"
          aria-label="Scroll Right"
        >
          <ChevronRight
            className="opacity-0 group-hover/btn-right:opacity-100 transition-opacity duration-300 scale-125"
            size={44}
            strokeWidth={3}
          />
        </button>
      </div>
      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </section>
  );
};
