import { GetServerSideProps } from "next";
import React from "react";
import { Movie, GenrePageProps } from "@/interfaces";
import MovieCard from "@/Components/common/MovieCard";
import Genre from "../genre";

const GenrePage: React.FC<GenrePageProps> = ({ id, movie, error }) => {
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
     <div className="min-h-screen px-4 lg:px-8 md:px-8 sm:px-8 py-4 mt-25">
        {movie.length === 0 && !error && (
          <p className="text-center text-gray-400 text-lg">
            No movies found at the moment. Please try again later.
          </p>
        )}
        <div className="w-full relative z-10 mb-8 ">
          <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold mb-4 text-gray-200">Genre</h1>
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
          {movie.map((movie) => (
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
  );
};

export const getServerSideProps: GetServerSideProps<GenrePageProps> = async (
  context
) => {
  const { id } = context.params || {};
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const API_ENDPOINT = `${BASE_URL}/api/genres/${id}`;

  // Basic validation for the ID from the URL parameter
  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
      props: {
        id: typeof id === "string" ? id : "",
        movie: [],
        error: "Invalid genre ID in URL.",
      },
    };
  }

  try {
    const res = await fetch(API_ENDPOINT);

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        errorDetails.message || `Failed to fetch movies, status: ${res.status}`
      );
    }

    const data = await res.json();
    const movie: Movie[] = data.results || [];

    return {
      props: {
        id,
        movie,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps for movie detail page:", error);
    return {
      props: {
        id: typeof id === "string" ? id : "",
        movie: [],
        error: `Failed to load movie details: ${
          (error as Error).message || "Unknown error"
        }`,
      },
    };
  }
};

export default GenrePage;
