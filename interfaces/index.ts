interface PopularMoviesResponse {
  page: number;
  results: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  }[];
}