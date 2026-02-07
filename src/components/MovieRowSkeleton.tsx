import { MovieCardSkeleton } from "./MovieCardSkeleton";

interface MovieRowSkeletonProps {
  title: string;
  count?: number;
}

export const MovieRowSkeleton = ({
  title,
  count = 8,
}: MovieRowSkeletonProps) => {
  return (
    <section className="relative px-4 md:px-12 py-4 overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-zinc-100 tracking-tight px-1 opacity-50">
        {title}
      </h2>

      <div className="relative">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(count)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
