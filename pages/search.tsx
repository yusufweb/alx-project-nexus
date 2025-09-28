import Image from "next/image";
import { SearchPageProps, SearchMovieResult } from "@/interfaces";
import { GetServerSideProps } from "next";
import MovieCard from "@/Components/common/MovieCard";
import Link from "next/link";
import { useLoadMore } from "@/hooks/useLoadmore";
import Button from "@/Components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { PaginatedResponse } from "@/interfaces";  

const fetchMovies = (query: string) => {
  return async (page: number): Promise<PaginatedResponse<SearchMovieResult>> => {
    const res = await fetch(`/api/movies/search?page=${page}&query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error("Failed to load movies.");
    }
    return res.json();
  };
};

const SearchPage: React.FC<SearchPageProps> = ({ results, totalPages, query, error }) => {

    const {
      items: movieList,
      loading,
      hasMore,
      loadMore,
    } = useLoadMore<SearchMovieResult>(fetchMovies(query), results, totalPages);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Search Error</h1>
          <p className="text-gray-300 mb-2">
            There was an issue fetching search results.
          </p>
          <p className="text-gray-400 text-sm">Details: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen px-4 lg:px-8 md:px-8 sm:px-8 py-4 mt-20 relative z-10 mb-8">
        <h1 className="text-[18px] lg:text-2xl sm:text-2xl md:text-2xl font-bold mb-8 text-center text-gray-100 mt-6">
          Search Results for &quot;{query}&quot;
        </h1>
        {movieList.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[100vh] bg-[#010822]">
            <Image
              src="/not-found-4064375-3363936.png"
              alt="not-found image"
              width={300}
              height={300}
            />
            <p className="text-3xl text-center mt-0">
              No movies found for {query} 
            </p>
            <p><span>Go back to <Link href="/" className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Home</Link></span></p>
          </div>
        ) : (
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
        )}

         {hasMore && (
          <Button
            onClick={loadMore}
            disabled={loading}
            className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 text-lg shadow-sm mx-auto block cursor-pointer"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <p className="text-sm">More movies</p>}
          </Button>
        )}
      </div>
    </>
  );
};

// getServerSideProps is used here to fetch data dynamically on each request,
// based on the URL query parameter.
export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  const { query } = context.query;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const API_ENDPOINT = `${BASE_URL}/api/movies/search`;

  // 1. Validate the search query
  if (!query || typeof query !== "string" || query.trim() === "") {
    return {
      props: {
        results: [],
        query: (query || "") as string,
        error: "Invalid search query.",
        totalPages: 1
      },
    };
  }

  const encodedQuery = encodeURIComponent(query.trim());

  try {
    // 2. Call internal search API route
    const res = await fetch(`${API_ENDPOINT}?page=1&query=${encodedQuery}`);

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        errorDetails.message ||
          `Failed to fetch search results, status: ${res.status}`
      );
    }

    const data = await res.json();
    const results: SearchMovieResult[] = data.results;

    // 3. Return the results as props
    return {
      props: {
        results,
        query,
        totalPages: data.total_pages
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps for search page:", error);
    return {
      props: {
        results: [],
        query,
        totalPages: 1,
        error: `Failed to load search results: ${
          (error as Error).message || "Unknown error"
        }`,
      },
    };
  }
};

export default SearchPage;
