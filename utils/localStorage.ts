import { Movie } from "@/interfaces";

export const FAVOURiTE_KEY = "favouritemovies";

export const getFavourites = () => {
  // ensure this run on the browser
  if (typeof window === "undefined") return [];

  try {
    const favourite = localStorage.getItem(FAVOURiTE_KEY);
    return favourite ? JSON.parse(favourite) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
};

export const saveFavourites = (favorites: Movie[]) => {
     // Check if window is defined
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FAVOURiTE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const addToFavorites = (movie: Movie): Movie[] => {
  const favorites = getFavourites();
  const isAlreadyFavorite = favorites.some((fav: { id: number; }) => fav.id === movie.id);

  if (!isAlreadyFavorite) {
    const updatedFavorites = [...favorites, movie];
    saveFavourites(updatedFavorites);
    return updatedFavorites;
  }
  return favorites; // Return original if already exists
};

export const removeFromFavorites = (movieId: number): Movie[] => {
  const favorites = getFavourites();
  const updatedFavorites = favorites.filter((movie: { id: number; }) => movie.id !== movieId);
  saveFavourites(updatedFavorites);
  return updatedFavorites;
};
