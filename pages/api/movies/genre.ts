import { NextApiRequest, NextApiResponse } from "next";
import { GenreProps } from "@/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    GenreProps | { message: string; details?: string }
  >
) {
  // Ensure only GET Method are allowed for this endpoint
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only Get Nethod is allowed" });
  }

  // Accessing the API key from the .env.local
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ message: "Server configuration error: TMDB API key missing." });
  }

  const TMDB_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`;

  try {
    const response = await fetch(TMDB_API_URL);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `TMDB API error: ${response.status} - ${
          errorData.status_message || response.statusText
        }`
      );
      return res.status(response.status).json({
        message: `Failed to fetch from TMDB: ${response.statusText}`,
        details: errorData,
      });
    }
    const data: GenreProps = await response.json();
    res.status(200).json(data); 
  } catch (error) {
    console.error("Error in /api/movies/popular:", error);
    res
      .status(500)
      .json({
        message: "Internal Server Error",
        details: (error as Error).message,
      });
  }
}