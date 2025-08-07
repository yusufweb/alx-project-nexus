import { MovieDetail } from "@/interfaces";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetail | { message: string; details?: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid movie ID parameter." });
  }

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ message: "Server configuration error: TMDB API key missing." });
  }

  const TMDB_DETAIL_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`;

  try {
    const response = await fetch(TMDB_DETAIL_URL);

    // check if the response from TMDB is successful
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ message: "Movie Not found." });
      }
      const errorData = await response.json();
      console.error(
        `TMDB Detail API error: ${response.status} - ${
          errorData.status_message || response.statusText
        }`
      );
      return res.status(response.status).json({
        message: `Failed to fetch movie details from TMDB: ${response.statusText}`,
        details: errorData,
      });
    }

    const data: MovieDetail = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/movies/[id]:", error);
    res
      .status(500)
      .json({
        message: "Internal Server Error",
        details: (error as Error).message,
      });
  }
}
