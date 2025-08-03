import { GetServerSideProps } from "next";
import { MovieDetailPageProps, MovieDetail } from "@/interfaces";
import { useRouter } from "next/router";
import Image from "next/image";

const MovieDetails: React.FC<MovieDetailPageProps> = ({ movie, error }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  //   404 ERROR
  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-xl text-gray-300 mb-4">
          {error || "Movie not found."}
        </p>
      </div>
    );
  }

  // --- Main Content Render ---
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const genresList = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="text-white min-h-screen">
      {/* Hero Backdrop Section */}
      <section className="relative h-120 w-full overflow-hidden">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            layout="fill"
            objectFit="cover"
            priority
            className="z-0 opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010616] to-transparent"></div>
      </section>

      {/* Main Movie Content */}
      <div className="container mx-auto px-6 -mt-20 z-10 relative">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                width={500}
                height={750}
                layout="responsive"
                objectFit="cover"
                className="rounded-xl shadow-2xl"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-center rounded-xl aspect-[2/3]">
                <span className="p-2">No Poster Available</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-start">
            <h1 className="text-4xl sm:text-4xl font-bold mb-2 text-white">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl italic text-gray-400 mb-4">
                &quot;{movie.tagline}&quot;
              </p>
            )}

            <div className="flex items-center text-xl text-gray-300 mb-6 space-x-4">
              <span>{releaseYear}</span>
              <span>•</span>
              <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
              <span>•</span>
              <span className="text-yellow-400 font-semibold">
                ⭐ {formattedRating}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                Overview
              </h2>
              <p className="text-lg text-gray-300">
                {movie.overview || "No overview available."}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                Genres
              </h2>
              <p className="text-lg text-gray-300">{genresList || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {movie.credits && movie.credits.cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
              Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movie.credits.cast.slice(0, 12).map(
                (
                  actor // Show top 12 cast members
                ) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        width={200}
                        height={200}
                        className="rounded-full w-24 h-24 object-cover mx-auto mb-2 transition-colors"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mx-auto mb-2 text-xs">
                        No Photo
                      </div>
                    )}
                    <p
                      className="font-semibold text-white truncate"
                      title={actor.name}
                    >
                      {actor.name}
                    </p>
                    <p
                      className="text-sm text-gray-400 truncate"
                      title={actor.character}
                    >
                      {actor.character}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// getServerSideProps is used to fetch the movie data dynamically on each request
export const getServerSideProps: GetServerSideProps<
  MovieDetailPageProps
> = async (context) => {
  const { id } = context.params || {};
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const API_ENDPOINT = `${BASE_URL}/api/movies/${id}`;

  // Basic validation for the ID from the URL parameter
  if (!id || Array.isArray(id)) {
    return {
      props: { movie: null, error: "Invalid movie ID in URL." },
      notFound: true, // Return a 404 page if ID is invalid
    };
  }

  try {
    const res = await fetch(API_ENDPOINT);
    // If the API route returns a 404, return a 404 page here too
    if (res.status === 404) {
      return {
        props: { movie: null, error: "Movie not found." },
        notFound: true,
      };
    }

    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        errorDetails.message ||
          `Failed to fetch movie details, status: ${res.status}`
      );
    }

    const movie: MovieDetail = await res.json();

    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps for movie detail page:", error);
    return {
      props: {
        movie: null,
        error: `Failed to load movie details: ${
          (error as Error).message || "Unknown error"
        }`,
      },
    };
  }
};

export default MovieDetails;
