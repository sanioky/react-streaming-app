"use client";

import { Play, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Movie } from "@/types/api";
import { MovieModal } from "./MovieModal";

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full h-[80vh] lg:h-[60vh] flex items-center justify-start overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          priority
          className="object-cover brightness-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-12 max-w-2xl mt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          {movie.title}
        </h1>

        <p className="text-zinc-300 text-sm md:text-lg mb-8 line-clamp-3 leading-relaxed drop-shadow-md">
          {movie.description ||
            "Discover the latest blockbuster available now on our platform."}
        </p>

        <div className="flex items-center gap-3">
          <button
            aria-label={`Play ${movie.title}`}
            className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <Play size={24} fill="black" />
            Play
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="More information"
            className="flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-zinc-500/50 text-white font-bold rounded hover:bg-zinc-500/70 transition-colors backdrop-blur-md cursor-pointer"
          >
            <Info size={24} />
            More Info
          </button>
        </div>
      </div>

      <MovieModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
