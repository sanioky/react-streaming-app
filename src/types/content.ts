export type Rating = 'G' | 'PG' | 'PG-13' | 'R' | '18+';

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  rating: Rating;
  duration: string;
  match: string;
  category: string;
}