import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";
import movies from "../../../movies.json";
import { BrowserRouter } from "react-router-dom";

describe(SearchBar, () => {
  it("should accept the user typing", async () => {
    render(<SearchBar allMovies={movies} />, { wrapper: BrowserRouter });

    await userEvent.type(screen.getByRole("textbox"), "titanic");

    expect(screen.getByRole("textbox")).toHaveValue("titanic");
  });

  it("should tell the user when a movie is found", async () => {
    render(<SearchBar allMovies={movies} />, { wrapper: BrowserRouter });

    await userEvent.type(
      screen.getByRole("textbox"),
      "the shawshank redemption{Enter}"
    );

    expect(
      await screen.findByText("the shawshank redemption", { exact: false })
    ).toBeInTheDocument();
  });

  it("should tell the user when a movie is not found", async () => {
    render(<SearchBar allMovies={movies} />, { wrapper: BrowserRouter });

    await userEvent.type(
      screen.getByRole("textbox"),
      "fake movie haha!!{Enter}"
    );

    expect(
      await screen.findByText("no movies found", { exact: false })
    ).toBeInTheDocument();
  });
});
