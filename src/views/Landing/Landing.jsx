import "./Landing.scss";
import React, { useState, useEffect } from "react";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import moviesData from "../../movies.json";
import poster from '../../assets/anime.jpg';
import Navbar from "../../components/Navbar/Navbar";

function Landing() {
  const [allMovies, setAllMovies] = useState([]);
  const [removePosterClass, setRemovePosterClass] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);


  useEffect(() => {
    function handleWindowResize() {
      if (window.innerWidth <= 400) {
        setRemovePosterClass(true);
      } else {
        setRemovePosterClass(false);
      }
    }


    window.addEventListener('resize', handleWindowResize);


    handleWindowResize();


    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setAllMovies(moviesData);
  }, []);

  useEffect(() => {
    const trendingMoviesData = allMovies.filter((movie) => movie.isTrending);
    setTrendingMovies(trendingMoviesData);

    const filteredMovies = allMovies.filter((movie) => !movie.isTrending);
    const randomMovies = getRandomMovies(filteredMovies, 7);
    setRecommendedMovies(randomMovies);
  }, [allMovies]);

  function getRandomMovies(movieArray, numberOfMovies) {
    const shuffledMovieArray = [...movieArray].sort(() => Math.random() - 0.5);
    return shuffledMovieArray.slice(0, numberOfMovies);
  }


  useEffect(() => {
    function getMovies() {
      try {
        const data = moviesData;
        setAllMovies(data);
      } catch (error) {
        console.error("Couldnt find any movies", error);
      }
    }
    getMovies();
  }, []);

  function getGenres(movies) {
    const uniqueGenres = new Set();

    movies.forEach((movie) => {
      const genres = movie.genre.split(", ").map((genre) => genre);
      genres.forEach((genre) => uniqueGenres.add(genre));
    });

    return Array.from(uniqueGenres);
  }

  const uniqueGenres = getGenres(allMovies);

  return (
    <div className={`landing ${removePosterClass ? 'remove-poster' : ''}`}>
      <Navbar allMovies={allMovies} />
      <div className="header-body">
        <img className="poster" src={poster} alt="poster" />
      </div>
      <h3>TRENDING</h3>
      <MovieCarousel genreMovies={trendingMovies} />
      <h3>RECOMMENDED</h3>
      <MovieCarousel genreMovies={recommendedMovies} />
      <br />
      {uniqueGenres.map((genre) => (
        <div key={genre}>
          <h2 className="genres__title">{genre}</h2>
          <MovieCarousel
            genreMovies={allMovies.filter((movie) =>
              movie.genre.includes(genre)
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default Landing;
