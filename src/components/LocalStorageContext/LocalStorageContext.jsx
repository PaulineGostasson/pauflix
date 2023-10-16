import { createContext, useState, useEffect } from "react";

// Create a context using createContext.
export const FavoriteMoviesContext = createContext();

// Create a provider component for our context that receives "children" as props.
export const FavoriteMoviesProvider = ({ children }) => {
  // Define a state variable to store favorite movies.
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Use the useEffect hook to retrieve previously saved favorite movies from localStorage when the component is rendered.
  useEffect(() => {
    // Retrieve data from localStorage or initialize an empty array if no favorite movies are stored.
    const storedMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(storedMovies);
  }, []);

  // Function to add a new favorite movie to the list.
  function addMovie(newMovie) {
    // Check if the movie already exists in the list.
    const isDuplicate = favoriteMovies.some(
      (currentMovie) => currentMovie.title === newMovie.title
    );

    if (!isDuplicate) {
      // If the movie is not already in the list, create a copy of the current list and add the new movie.
      const updatedMovies = [...favoriteMovies, newMovie];

      // Save the updated list to localStorage in JSON format.
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
      setFavoriteMovies(updatedMovies);
    }
  }

  // Function to remove a favorite movie from the list.
  function removeMovie(movieToRemove) {
    // Filter out the movie to be removed from the list.
    const updatedMovies = favoriteMovies.filter(
      (movie) => movie.title !== movieToRemove.title
    );

    // Save the updated list to localStorage in JSON format.
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
    setFavoriteMovies(updatedMovies);
  }

  // Provide our context with the necessary values and functions (favoriteMovies, addMovie, removeMovie).
  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
