import { GetStaticProps } from "next";
import { HomePageProps, Movie, PopularMoviesResponse } from "@/interfaces";
import Hero from "@/Components/common/Hero";
import MovieCard from "@/Components/common/MovieCard";
import { useState } from "react";
import Button from "@/Components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

const Home: React.FC<HomePageProps> = ({ totalPages, movies, error }) => {
  const [movieList, setMovieList] = useState<Movie[]>(movies || []);
  const [pageCount, setPageCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    (movies?.length ?? 0) > 0 && (totalPages ?? 1) > 1
  );

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = pageCount + 1;
      const res = await fetch(`/api/movies/popular?page=${nextPage}`);
      const data: PopularMoviesResponse = await res.json();

      setMovieList((prev) => [...prev, ...data.results]);
      setPageCount(nextPage);
      setHasMore(nextPage < data.total_pages);
    } catch (err) {
      console.error("Error loading more movies:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error Loading Movies
          </h1>
          <p className="text-gray-300 mb-2">
            There was an issue fetching the movie data.
          </p>
          <p className="text-gray-400 text-sm">Details: {error}</p>
          <p className="mt-4 text-gray-400">
            Please ensure your internet connection is stable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <div className="min-h-screen px-4 lg:px-8 md:px-8 sm:px-8 py-4 -mt-18">
        {movieList.length === 0 && !error && (
          <p className="text-center text-gray-400 text-lg">
            No popular movies found at the moment. Please try again later.
          </p>
        )}
        <div className="w-full relative z-10 mb-8 ">
          <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold mb-4 text-gray-200">
            Browse Popular Movies
          </h1>
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
          {movieList.map((movie) => (
            <div key={movie.id}>
              <MovieCard
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                id={movie.id}
                poster_path={movie.poster_path}
              />
            </div>
          ))}
        </div>

        {hasMore && (
          <Button
            onClick={loadMore}
            disabled={loading}
            className="mt-8 px-6 py-2 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors duration-300 text-lg shadow-sm mx-auto block cursor-pointer"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin size="2x" /> : "Load more movies"}
          </Button>
        )}
      </div>
    </>
  );
};

// This function runs at build time on the server to pre-render the page
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Determine the base URL for the API route.
  // Used NEXT_PUBLIC_BASE_URL for Vercel deployment or local development.
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const API_ENDPOINT = `${BASE_URL}/api/movies/popular?page=1`;

  try {
    // Call your own internal API route (which then securely calls TMDB)
    const res = await fetch(API_ENDPOINT);

    if (!res.ok) {
      // If your API route returns an error, log it and pass it to the page
      const errorDetails = await res.json();
      console.error(
        `Error from internal API route (${API_ENDPOINT}):`,
        errorDetails
      );
      throw new Error(
        errorDetails.message ||
          `Failed to fetch from internal API, status: ${res.status}`
      );
    }

    const data = await res.json();
    const movies: Movie[] = data.results;

    return {
      props: {
        movies,
        totalPages: data.total_pages,
      },
      // Incremental Static Regeneration (ISR):
      // Re-generate this page in the background at most every 3600 seconds (1 hour).
      // This means the page content will be updated periodically without requiring a full redeploy.
      // A stale version is served immediately, then a fresh version is generated.
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps for HomePage:", error);
    return {
      props: {
        movies: [], // Pass an empty array
        totalPages: 1, // Provide a default value for totalPages
        error: `Could not load popular movies. ${
          (error as Error).message || "Please check server logs."
        }`,
      },
      // If an error occurs during build time, we can still set a revalidate time
      // to attempt to re-fetch the data later (e.g., if API key was temporarily down).
      revalidate: 60, // Try to re-fetch every minute if there's an issue
    };
  }
};

export default Home;