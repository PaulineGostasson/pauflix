import "./MovieCarousel.scss";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Movie from "../Movie/Movie";

function MovieCarousel({ genreMovies }) {
  const gridRef = useRef(null);
  const [movieCount, setMovieCount] = useState(0);
  const [scrollLeftVisible, setScrollLeftVisible] = useState(true);
  const [scrollRightVisible, setScrollRightVisible] = useState(true);

  useEffect(() => {
    setMovieCount(genreMovies ? genreMovies.length : 0);
  }, [genreMovies]);

  useEffect(() => {
    if (gridRef.current) {
      setScrollLeftVisible(gridRef.current.scrollLeft > 0);
      // Check if the right arrow should be visible
      setScrollRightVisible(
        gridRef.current.scrollLeft < gridRef.current.scrollWidth - gridRef.current.clientWidth
      );
    }
  }, [movieCount]);

  const scroll = (distance) => {
    if (gridRef.current) {
      gridRef.current.scrollLeft += distance;
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleDragMove = (e) => {
      const distance = startX - e.clientX;
      scroll(distance);
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className="display-carousel">
      {movieCount >= 4 && scrollLeftVisible && (
        <button className="arrow arrow-left" onClick={() => scroll(-400)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <div className="grid" role="categories__title" ref={gridRef} onMouseDown={handleDragStart}>
        {genreMovies ? (
          genreMovies.map((movie, index) => (
            <Movie
              key={index}
              className="grid__item"
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              genre={movie.genre}
              actors={movie.actors}
              synopsis={movie.synopsis}
            />
          ))
        ) : (
          <p>error</p>
        )}
      </div>
      {movieCount >= 4 && scrollRightVisible && (
        <button className="arrow arrow-right" onClick={() => scroll(400)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
}

export default MovieCarousel;
