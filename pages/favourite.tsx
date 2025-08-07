import React from "react";
import { Movie } from "@/interfaces";
import { useFavorites } from "@/hooks/useFavourites";
import MovieCard from "@/Components/common/MovieCard";

const Favorite: React.FC<Movie> = () => {
  const { favorites } = useFavorites();
  return (
    <div className="min-h-screen text-white p-6 mt-20 pb-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-100 mt-6">
          My Favorite Movies
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-12">
            <p>You have not added any favorite movies yet.</p>
            <p className="mt-2">Start exploring and save your top picks!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
            {favorites.map((movie: Movie) => (
              <MovieCard
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                id={movie.id}
                poster_path={movie.poster_path}
                key={movie.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
