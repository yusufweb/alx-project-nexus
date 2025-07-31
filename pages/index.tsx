import { GetStaticProps } from "next";
import { HomePageProps, Movie } from "@/interfaces";
import Hero from "@/Components/common/Hero";
import Header from "@/Components/Layout/Header";

const Home: React.FC<HomePageProps> = ({ movies, error }) => {
  return (
    <div>
      <Header />
      <Hero />
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title} &bull; {movie.release_date}</div>
      ))}
    </div>
  );
};

// This function runs at build time on the server to pre-render the page
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Determine the base URL for the API route.
  // Use NEXT_PUBLIC_BASE_URL for Vercel deployment or local development.
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
