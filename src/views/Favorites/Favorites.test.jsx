import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Favorites from "./Favorites";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesProvider } from "../../components/LocalStorageContext/LocalStorageContext";


describe("Favorites Component", () => {
  it("should display the header and an empty favorites view", async () => {
    render(
      <FavoriteMoviesProvider>
        <Favorites />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );


    const headerTitle = screen.getByText("Your Header Text", { exact: false });
    expect(headerTitle).toBeInTheDocument();


    const favoritesTitle = screen.getByText("FAVORITES:");
    expect(favoritesTitle).toBeInTheDocument();


    await screen.findByText("This page is empty");
  });

  it("should display favorite movies when they exist", () => {
    const mockFavoriteMovies = [
      { title: "Movie 1", year: "2022", },
      { title: "Movie 2", year: "2021", },
    ];

    render(
      <FavoriteMoviesProvider value={{ favoriteMovies: mockFavoriteMovies }}>
        <Favorites />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );

    mockFavoriteMovies.forEach((movie) => {
      const movieTitle = screen.getByText(movie.title);
      expect(movieTitle).toBeInTheDocument();
    });
  });
});
