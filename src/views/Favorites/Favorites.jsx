import "./Favorites.scss";
import Header from "../../components/Header/Header";
import { useContext } from "react";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";
import Movie from "../../components/Movie/Movie";
import { useNavigate } from "react-router";

function Favorites() {
  const { favoriteMovies, removeMovie } = useContext(FavoriteMoviesContext);

  const navigate = useNavigate();
  function handleDelete(titleToDelete) {
    const movieToRemove = favoriteMovies.find(
      (movie) => movie.title === titleToDelete
    );
    removeMovie(movieToRemove);
  }

  function movieInfoToMovieInfoPage(movie) {
    const movieData = {
      title: movie.title,
      year: movie.year,
      thumbnail: movie.thumbnail,
      genre: movie.genre,
      actors: movie.actors,
      synopsis: movie.synopsis,
    };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    navigate("/movie-pau/movie-info");
  }

  return (
    <div className="favorites">
      <Header />
      <h3>FAVORITES: </h3>
      <br />
      <div className="favorites__container">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie, index) => (
            <Movie
              onClick={() => movieInfoToMovieInfoPage(movie)}
              key={movie.title}
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              genre={movie.genre}
              actors={movie.actors}
              synopsis={movie.synopsis}
              handleFavoriteMovie={() => handleDelete(index)}
            />
          ))
        ) : (
          <p className="favorites__empty">This page is empty</p>
        )}
      </div>

    </div>
  );
}

export default Favorites;
