import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesProvider } from "../../components/LocalStorageContext/LocalStorageContext";

describe("Landing Component", () => {
  it("should display header, trending, and recommended in the landing view", () => {
    render(
      <FavoriteMoviesProvider>
        <BrowserRouter>
          <Landing />
        </BrowserRouter>
      </FavoriteMoviesProvider>
    );

    const headerTitle = screen.getByText("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    expect(screen.getByText("TRENDING")).toBeInTheDocument();
    expect(screen.getByText("RECOMMENDED")).toBeInTheDocument();

    const moviesInLanding = screen.getAllByAltText("Movie Poster");
    expect(moviesInLanding).toHaveLength(14);
  });
});
