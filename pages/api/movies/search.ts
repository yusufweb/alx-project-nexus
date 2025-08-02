import { NextApiRequest, NextApiResponse } from "next";
import { SearchApiResponse } from "@/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    SearchApiResponse | { message: string; details?: any }
  >
) {
  // Ensure only GET Method are allowed for this endpoint
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only Get Nethod is allowed" });
  }

  const {query} = req.query

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return res.status(400).json({ message: 'Missing or invalid search query parameter.' });
  }

  // Accessing the API key from the .env.local
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ message: "Server configuration error: TMDB API key missing." });
  }

  // Encode the search query to handle spaces and special characters
  const encodedQuery = encodeURIComponent(query.trim());

  const TMDB_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=en-US&page=1`;

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
    const data: SearchApiResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/movies/search:", error);
    res
      .status(500)
      .json({
        message: "Internal Server Error",
        details: (error as Error).message,
      });
  }
}
