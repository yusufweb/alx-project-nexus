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
  title: string | any,
  className?: string,
  onClick?: (e: React.MouseEvent) => void
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

// shape of the data for a single movie detail page
export interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
}

export interface MovieDetailPageProps {
  movie: MovieDetail | null;
  error?: string;
}
