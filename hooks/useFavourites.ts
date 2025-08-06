// hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { getFavourites, addToFavorites, removeFromFavorites } from '../utils/localStorage';
import { Movie } from '@/interfaces';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage on component mount
    // This runs only once when the component mounts
    setFavorites(getFavourites());
    setIsLoading(false);
  }, []); // Empty dependency array means it runs once

  const toggleFavorite = (movie: Movie) => {
    // Determine if the movie is currently a favorite based on the current state
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    let updatedFavorites: Movie[];
    if (isFavorite) {
      updatedFavorites = removeFromFavorites(movie.id);
      console.log(`Removed "${movie.title}" from favorites`);
    } else {
      updatedFavorites = addToFavorites(movie);
      console.log(`Added "${movie.title}" to favorites`);
    }
    // Update the component's state to reflect the change immediately
    setFavorites(updatedFavorites);
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(movie => movie.id === movieId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoading
  };
};