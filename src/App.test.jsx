import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Favorites from "./views/Favorites/Favorites";
import MovieInfo from "./views/movieInfo/movieInfo";
import { FavoriteMoviesProvider } from "./components/LocalStorageContext/LocalStorageContext";
import Movie from "./components/Movie/Movie";

describe("Movie App Tests", () => {
  it("should navigate to Movie Info when clicking on a movie", async () => {
    render(
      <FavoriteMoviesProvider>
        <BrowserRouter>
          <Movie />
        </BrowserRouter>
      </FavoriteMoviesProvider>
    );

    const movie = screen.getByTestId("Movie");

    await userEvent.click(movie);

    expect(window.location.pathname).toBe("/pauflix/movie-info");
  });

  it("should add a movie to favorites and view it in Favorites", async () => {
    const entries = "/pauflix/";
    const user = userEvent.setup();

    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/favorites" element={<Favorites />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const favorite = screen.getAllByTestId("favorite");
    user.click(favorite[0]);

    const favoritesLink = screen.getAllByText("FAVORITES");
    await user.click(favoritesLink[0]);

    const favoriteMovie = screen.getByText("The Godfather: Part II");

    expect(favoriteMovie).toBeInTheDocument();
  });

  it("should add and then remove a movie from favorites", async () => {
    const entries = "/pauflix/";
    const user = userEvent.setup();

    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/favorites" element={<Favorites />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const favorite = screen.getAllByTestId("favorite");
    const navigationToFavorites = screen.getAllByText("FAVORITES");

    // Add a movie to favorites
    await user.click(favorite[0]);
    await user.click(navigationToFavorites[0]);

    // Check if the movie is in favorites
    await waitFor(() => {
      screen.findByText("The Godfather: Part II");
    });

    const navigationToLanding = screen.getAllByText("HOME");
    await user.click(navigationToLanding[0]);

    // Remove the movie from favorites
    await user.click(favorite[0]);
    await user.click(navigationToFavorites[0]);

    // Check if the favorites list is empty
    await waitFor(() => {
      screen.findByText("You have no favorites yet!");
    });
  });

  it("should display images on all movies", async () => {
    const entries = "/pauflix/";
    const user = userEvent.setup();

    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/categories" element={<Genres />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const navigationToCategories = screen.getAllByText("CATEGORIES");
    await user.click(navigationToCategories[0]);

    const images = await screen.findAllByAltText("movie-img");
    expect(images).toHaveLength(69);
  });

  it("should mark a movie as a favorite from Movie Info", async () => {
    const entries = "/pauflix/";
    const user = userEvent.setup();
    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/movie-info" element={<MovieInfo />} />
            <Route path="/pauflix/favorites" element={<Favorites />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const image = screen.getAllByAltText("movie-img");
    await user.click(image[0]);

    const movieInfoFavorite = screen.getByTestId("movieInfo-fave");
    await user.click(movieInfoFavorite);

    const navigationToFavorites = screen.getAllByText("FAVORITES");
    await user.click(navigationToFavorites[0]);

    await waitFor(() => {
      screen.findByText("The Godfather: Part II");
    });
  });

  it("should display all information about a movie in Movie Info", async () => {
    const entries = "/pauflix/";
    const user = userEvent.setup();

    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/movie-info" element={<MovieInfo />} />
            <Route path="/pauflix/categories" element={<Genres />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const image = screen.getAllByAltText("movie-img");
    await user.click(image[2]);

    const movieInfoFavorite = screen.getByTestId("movieInfo-fave");
    const errorImg = screen.getByAltText("");

    expect(movieInfoFavorite).toBeInTheDocument();
    expect(errorImg).toBeInTheDocument();
    expect(screen.getByText("Fight Club")).toBeInTheDocument();
    expect(screen.getByText("Year: 1999")).toBeInTheDocument();

    expect(
      screen.getByText(
        "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Genre: Drama")).toBeInTheDocument();
  });

  it("should add a movie to favorites and check if it's added to localStorage", async () => {
    const entries = "/pauflix/";

    localStorage.clear();

    const user = userEvent.setup();
    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/favorite" element={<Favorites />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const favorite = screen.getAllByTestId("favorite");
    await user.click(favorite[0]);

    const navToFave = screen.getAllByText("FAVORITES");
    await user.click(navToFave[0]);

    const favoriteMovies = localStorage.getItem("favoriteMovies");
    const favoriteMoviesArray = JSON.parse(favoriteMovies);

    expect(favoriteMoviesArray).not.toBeNull();
    expect(Array.isArray(favoriteMoviesArray)).toBe(true);
    expect(favoriteMoviesArray).toContainEqual(
      expect.objectContaining({ title: "The Godfather: Part II" })
    );
  });

  it("should delete a movie from localStorage when clicking a favorite twice", async () => {
    const user = userEvent.setup();
    const entries = "/pauflix/";

    localStorage.clear();

    render(
      <FavoriteMoviesProvider>
        <MemoryRouter initialEntries={[entries]}>
          <Routes>
            <Route path="/pauflix/" element={<Landing />} />
            <Route path="/pauflix/favorites" element={<Favorites />} />
          </Routes>
        </MemoryRouter>
      </FavoriteMoviesProvider>
    );

    const favorites = screen.getAllByTestId("favorite");
    await user.click(favorites[0]);
    await user.click(favorites[0]);

    const favoriteMovies = localStorage.getItem("favoriteMovies");
    const favoriteMoviesArray = JSON.parse(favoriteMovies);

    expect(Array.isArray(favoriteMoviesArray)).toBe(true);
    expect(favoriteMoviesArray).toHaveLength(0);
  });
});
