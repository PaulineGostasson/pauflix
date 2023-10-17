import "./Movie.scss";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../assets/noImage.jpg";
import { FavoriteMoviesContext } from "../LocalStorageContext/LocalStorageContext";

function Movie({ title, year, thumbnail, genre, actors, synopsis }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addMovie, removeMovie, favoriteMovies } = useContext(
    FavoriteMoviesContext
  );
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleViewFilm = () => {
    const movieData = {
      title,
      year,
      thumbnail: imageError ? noImage : thumbnail,
      genre,
      actors,
      synopsis,
    };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    navigate("/pauflix/movie-info");
  };
  useEffect(() => {
    const existingMovie = favoriteMovies.find((movie) => movie.title === title);
    setIsFavorite(existingMovie !== undefined);
  }, [favoriteMovies, title]);

  const handleFavoriteMovie = () => {
    const movieToAdd = {
      title,
      year,
      thumbnail: imageError ? noImage : thumbnail,
      genre,
      actors,
      synopsis,
    };
    if (isFavorite) {
      removeMovie(movieToAdd);
    } else {
      addMovie(movieToAdd);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card__wrapper">
      <article className="movie-card" role="movie-card">
        <div className="movie-card__image-container">
          {imageError ? (
            <img
              className="movie-card__image"
              src={noImage}
              onClick={handleViewFilm}
            />
          ) : (
            <img
              className="movie-card__image"
              src={thumbnail}
              alt="movie-img"
              onClick={handleViewFilm}
              onError={handleImageError}
              data-testid="Movie"
            />
          )}
          <div className="movie-card__info">
            <h4 className="movie-card__title">{title}</h4>
            <h4 className="movie-card__year">{year}</h4>
            <FontAwesomeIcon
              data-testid="favorite"
              icon={faStar}
              onClick={handleFavoriteMovie}
              className={`movie-card__favorite-icon ${isFavorite ? "movie-card__favorite-icon--active" : ""
                }`}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default Movie;
