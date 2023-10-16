import "./Navbar.scss";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar(allMovies) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1
          onClick={() => {
            navigate("/movie-pau");
          }}
        >
          PauFlix{" "}
        </h1>
      </div>

      <div className="navbar__menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <ul className={`navbar__list ${isOpen ? "is-open" : ""}`}>
        <li
          className="navbar__li"
          onClick={() => {
            navigate("/movie-pau");
            setIsOpen(false);
          }}
        >
          HOME
        </li>
        <li
          className="navbar__li"
          onClick={() => {
            navigate("/movie-pau/favorites");
            setIsOpen(false);
          }}
        >
          FAVORITES
        </li>
      </ul>
      <SearchBar allMovies={allMovies} />
    </div>

  );
}

export default Navbar;
