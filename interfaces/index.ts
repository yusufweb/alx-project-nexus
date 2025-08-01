export interface PopularMoviesResponse {
  page: number;
  results: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  }[];
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface HomePageProps {
  movies: Movie[];
  error?: string; // Optional error message to display
}

export interface ButtonProps {
  title: string,
  className?: string,
  onClick?: () => void
}

export interface SearchMovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface SearchApiResponse {
  page: number;
  results: SearchMovieResult[];
}

export interface SearchPageProps {
  results: SearchMovieResult[];
  query: string;
  error?: string;
}