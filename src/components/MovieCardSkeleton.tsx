export const MovieCardSkeleton = () => {
  return (
    <div className="relative flex-none w-40 md:w-60 group cursor-default snap-start transform-gpu">
      <div className="relative aspect-2/3 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 animate-pulse">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
          <div className="h-4 bg-zinc-800 rounded-md w-3/4 shadow-sm" />
          <div className="flex gap-2">
            <div className="h-3 bg-zinc-800 rounded-md w-8" />
            <div className="h-3 bg-zinc-800 rounded-md w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
