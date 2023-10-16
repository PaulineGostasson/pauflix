import Movie from "./Movie";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { it, expect } from "vitest"; //vitest
import { FavoriteMoviesProvider } from "../LocalStorageContext/LocalStorageContext";

it("should render Movie component with props", () => {
  const movie = {
    title: "Movie Title",
    thumbnail: "image-url.jpg",
    year: "1974",
  };

  render(
    <FavoriteMoviesProvider>
      <Movie
        title={movie.title}
        thumbnail={movie.thumbnail}
        year={movie.year}
      />
    </FavoriteMoviesProvider>,
    { wrapper: BrowserRouter }
  );

  const title = screen.getByText("Movie Title");
  const image = screen.getByAltText("movie-img");
  const year = screen.getByText("1974");

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(year).toBeInTheDocument();
});
