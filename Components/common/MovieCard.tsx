import React from "react";
import { Movie } from "@/interfaces";
import Image from "next/image";
import Button from "./Button";

const MovieCard: React.FC<Movie> = ({
  title,
  release_date,
  poster_path,
  vote_average,
}: Movie) => {
  return (
    <div className="rounded-lg shadow-lg bg-[#010822] p-2 relative cursor-pointer group overflow-hidden h-full">
      <div className="relative">
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500} 
            height={500}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-center rounded-t-lg aspect-[2/3]">
            <span className="p-2">No Poster Available</span>
          </div>
        )}

        {/* Hover button placed inside image container */}
        <div className="absolute bottom-3 right-3 lg:opacity-0 lg:group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button title="Save" />
        </div>
      </div>

      <div className="pt-3 space-y-3">
        <p className="font-semibold lg:text-[14px] md:text-[16px] text-[20px]">{title}</p>
        <div className="flex space-x-3 text-[14px] text-gray-200 font-semibold lg:text-[12px] md:text-[14px]">
          <span>⭐ {vote_average.toFixed(1)}</span>
          <span>&bull;</span>
          <span>{release_date ? new Date(release_date).getFullYear() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
