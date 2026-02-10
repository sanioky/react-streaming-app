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
    <section className="relative w-full h-[70vh] min-h-100 lg:h-[50vh] flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0">
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
          <button aria-label={`Play ${movie.title}`} className="btn-primary">
            <Play size={24} fill="black" />
            Play
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="More information"
            className="btn-secondary"
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
