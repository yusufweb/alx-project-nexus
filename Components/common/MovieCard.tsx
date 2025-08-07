import React, { useEffect, useState } from "react";
import { Movie } from "@/interfaces";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import { useFavorites } from "@/hooks/useFavourites";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard: React.FC<Movie> = ({
  id,
  title,
  release_date,
  poster_path,
  vote_average,
}: Movie) => {
  const router = useRouter();

  const { toggleFavorite, isFavorite, isLoading } = useFavorites();

  // Determine if the current movie is a favorite
  const isCurrentlyFavorite = isFavorite(id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    toggleFavorite({ id, title, release_date, poster_path, vote_average });
  };

  const handleCardClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div
      className="rounded-lg shadow-lg bg-[#010822] p-2 relative cursor-pointer group overflow-hidden h-full"
      onClick={handleCardClick}
    >
      <div className="relative">
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500}
            height={500}
            className="rounded-lg object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-center rounded-t-lg aspect-[2/3]">
            <span className="p-2">No Poster Available</span>
          </div>
        )}

        {/* Hover button placed inside image container */}
        <div className="absolute bottom-3 right-3">
          {/* <Button
            title={
              isCurrentlyFavorite ? (
                <Image
                  src="/heart-saved.png"
                  width={30}
                  height={30}
                  alt="liked"
                />
              ) : (
                <Image
                  src="/heart-default.png"
                  width={30}
                  height={30}
                  alt="liked"
                />
              )
            }
            onClick={handleSaveClick}
            className="bg-transparent hover:bg-transparent"
          /> */}
           <Button
            title={
              isCurrentlyFavorite ? (
                <FontAwesomeIcon icon={faHeart} className="text-red-500 text-2xl" fade/>
              ) : (
                 <FontAwesomeIcon icon={faHeart} className="text-white text-2xl" fade/>
              )
            }
            onClick={handleSaveClick}
            className="bg-transparent hover:bg-transparent"
          />
        </div>
      </div>

      <div className="pt-3 space-y-3">
        <p className="font-semibold lg:text-[14px] md:text-[16px] text-[20px]">
          {title}
        </p>
        <div className="flex space-x-3 text-[14px] text-gray-200 font-semibold lg:text-[12px] md:text-[14px]">
          <span>⭐ {vote_average.toFixed(1)}</span>
          <span>&bull;</span>
          <span>
            {release_date ? new Date(release_date).getFullYear() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 