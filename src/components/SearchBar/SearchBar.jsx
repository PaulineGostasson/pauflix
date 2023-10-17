import "./SearchBar.scss";
import { useState } from "react";
import movies from "../../movies.json";
import { useNavigate } from "react-router";
import noImage from "../../assets/noImage.jpg";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  let filteredMovies = []

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().startsWith(inputValue)
  });

  const handleMovieClick = (movie) => {
    const movieData = {
      title: filteredMovies[0].title,
      year: filteredMovies[0].year,
      thumbnail: filteredMovies[0].thumbnail,
      genre: filteredMovies[0].genre,
      actors: filteredMovies[0].actors,
      synopsis: filteredMovies[0].synopsis,
      handleImageError: filteredMovies[0].handleImageError,
    };
    console.log(movieData)
    if (movieData.thumbnail === '') {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));
      navigate("/pauflix/movie-info");
      return movieData;
    } else {
      localStorage.setItem("selectedMovie", JSON.stringify(movie));
      navigate("/pauflix/movie-info");
      window.location.reload();
      return movieData;
    }
  };

  return (
    <div className="SearchBar">
      <input
        className="SearchBar__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search movies here..."
      />

      {(filteredMovies.length > 0 && inputValue) ? (
        <aside className="SearchBar__aside">
          {filteredMovies.map((movie, index) => {

            return (
              <div className="SearchBar__movie" key={movie.title + index}>
                <img
                  className="SearchBar__movie__img"
                  onClick={() => handleMovieClick(movie)}
                  src={movie.thumbnail}
                  alt={movie.title}
                  onError={(e) => handleImageError(e)}
                />

                <h2 className="SearchBar__movie__title">{movie.title}</h2>
                <p className="SearchBar__movie__year">{movie.year}</p>

              </div>
            );
          })}
        </aside>
      ) : inputValue && (
        <aside className="SearchBar__error">
          <p className="SearchBar__error__text">No movies found</p>
        </aside>
      )}
    </div>
  );

}

export default SearchBar;
