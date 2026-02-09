import Image from "next/image";
import { Star } from "lucide-react";
import { Movie } from "@/types/api";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { memo } from "react";
import { ProgressBar } from "./ProgressBar";

const MovieCardComponent = ({
  movie,
  onClick,
}: {
  movie: Movie;
  onClick: () => void;
}) => {
  const { history } = useWatchHistory();
  const watchData = history[movie.id];
  const progress = watchData?.progress ?? 0;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View details for ${movie.title}`}
      className="relative flex-none w-40 md:w-60 group/card cursor-pointer snap-start transform-gpu"
    >
      <div className="relative aspect-2/3 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 group-hover/card:border-zinc-500 transition-all duration-300">
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 160px, 240px"
          className="object-cover group-hover/card:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-semibold text-sm md:text-base leading-tight truncate group-hover/card:text-yellow-400 transition-colors">
            {movie.title}
          </p>
          <div className="flex items-center gap-2 mt-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
            <span className="text-zinc-300 text-[10px] md:text-xs">
              {movie.year}
            </span>
            <div className="flex items-center gap-0.5 text-yellow-500">
              <Star size={10} fill="currentColor" />
              <span className="text-[10px] md:text-xs font-bold text-white">
                {movie.rating}
              </span>
            </div>
          </div>
        </div>

        <ProgressBar
          progress={progress}
          className="absolute bottom-0 left-0 rounded-none border-none h-1"
        />
      </div>
    </div>
  );
};

export const MovieCard = memo(MovieCardComponent);
