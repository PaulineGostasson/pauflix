import "./movieInfo.scss";
import Header from "../../components/Header/Header";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../assets/noImage.jpg";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";

function MovieInfo() {
  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { addMovie, removeMovie } = useContext(FavoriteMoviesContext);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    if (storedMovie) {
      setMovie(storedMovie);
      const storedMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      const isFav = storedMovies.some(
        (storedMovie) => storedMovie.title === movie.title
      );
      setIsFavorite(isFav);
    }
  }, [movie.title]);

  const handleFavoriteMovie = () => {
    if (isFavorite) {
      removeMovie(movie);
      setIsFavorite(false);
    } else {
      addMovie(movie);
      setIsFavorite(true);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  };

  return (
    <div className="movieInfo__main-container">
      <Header />
      <div className="movieInfo">
        <img
          className="movieInfo__image"
          src={movie.thumbnail}
          alt=""
          onError={handleImageError}
        />
        <section className="movieInfo__container">
          <article className="movieInfo__side">
            <h3 className="movieInfo__title">{movie.title}</h3>
            <FontAwesomeIcon
              data-testid="movieInfo-favorite"
              icon={faStar}
              className={`movieInfo__fave ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteMovie}
            />
            <h4>Year: {movie.year}</h4>
            <p>{movie.synopsis}</p>
          </article>
          <article className="movieInfo__side2">
            <h4>Actors: </h4>
            {movie.actors &&
              movie.actors.map((actor, index) => <p key={index}>{actor}</p>)}
            <h4>Genre: {movie.genre}</h4>
          </article>
        </section>
      </div>

    </div>
  );
}

export default MovieInfo;
