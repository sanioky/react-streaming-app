export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  thumbnail: string;
  duration: number;
  description: string;
  cast: string[];
  watchProgress: number;
}

export interface ApiResponse {
  content: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    totalItems: number;
  };
  categories: {
    trending: Movie[];
    forYou: Movie[];
    newReleases: Movie[];
  };
}
