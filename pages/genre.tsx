import React from "react";
import useSWR from "swr";
import { GenresPageProps } from "@/interfaces";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Genre: React.FC = () => {
  const router = useRouter();
  const { error, data } = useSWR<GenresPageProps>("/api/genres/genre", fetcher);

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen pt-25 px-8">
        Failed to load movies.
      </div>
    );
  if (!data)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen pt-25 px-8">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen pt-25 px-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-200">Browse by Genre</h1>
      <div className="text-md text-gray-300 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 pt-4">
        {data?.genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => router.push(`/genre/${genre.id}`)}
            className="bg-gray-900 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition"
          >
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
