import { MovieDetail, Review, MovieDetailWithReviews } from "@/interfaces";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetailWithReviews | { message: string; details?: string }>
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
  const TMDB_REVIEWS_URL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  
  try {
    const [movieRes, reviewsRes] = await Promise.all([
      fetch(TMDB_DETAIL_URL),
      fetch(TMDB_REVIEWS_URL),
    ]);

    if (!movieRes.ok) {
      const errorData = await movieRes.json();
      return res.status(movieRes.status).json({
        message: `Failed to fetch movie details: ${movieRes.statusText}`,
        details: errorData,
      });
    }

    if (!reviewsRes.ok) {
      const errorData = await reviewsRes.json();
      return res.status(reviewsRes.status).json({
        message: `Failed to fetch movie reviews: ${reviewsRes.statusText}`,
        details: errorData,
      });
    }

    const movie: MovieDetail = await movieRes.json();
    const reviewsData = await reviewsRes.json();

    return res.status(200).json({
      movie,
      reviews: reviewsData.results as Review[],
      reviewMeta: {
        page: reviewsData.page,
        total_pages: reviewsData.total_pages,
        total_results: reviewsData.total_results,
      },
    });
  } catch (error) {
    console.error("Error in /api/movies/[id]:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      details: (error as Error).message,
    });
  }
}