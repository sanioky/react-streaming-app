import { Suspense } from "react";
import { MovieRow } from "@/components/MovieRow";
import { MovieRowSkeleton } from "@/components/MovieRowSkeleton";
import moviesResponse from "@/data/movies.json";
import { Hero } from "@/components/Hero";

// Simulate API request with artificial delay to demonstrate loading state
async function getTrendingMovies() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return moviesResponse.categories.trending;
}

async function TrendingRow() {
  const movies = await getTrendingMovies();
  return <MovieRow title="Trending Now" movies={movies} />;
}

export default function Home() {
  const trendingMovies = moviesResponse.categories.trending;
  const heroMovie = trendingMovies[0];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Hero movie={heroMovie} />

      <div className="relative z-20 py-10">
        <Suspense fallback={<MovieRowSkeleton title="Trending Now" />}>
          <TrendingRow />
        </Suspense>
      </div>
    </main>
  );
}
