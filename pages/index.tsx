import { GetStaticProps } from "next";
import { HomePageProps, Movie } from "@/interfaces";
import Hero from "@/Components/common/Hero";
import MovieCard from "@/Components/common/MovieCard";

const Home: React.FC<HomePageProps> = ({ movies, error }) => {
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
        {movies.length === 0 && !error && (
          <p className="text-center text-gray-400 text-lg">
            No popular movies found at the moment. Please try again later.
          </p>
        )}
        <div className="w-full relative z-10 mb-8 ">
          <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold mb-4 text-gray-200">Browse Popular Movies</h1>
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5">
          {movies.map((movie) => (
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
      </div>
    </>
  );
};

// This function runs at build time on the server to pre-render the page
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Determine the base URL for the API route.
  // Used NEXT_PUBLIC_BASE_URL for Vercel deployment or local development.
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const API_ENDPOINT = `${BASE_URL}/api/movies/popular`;

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
