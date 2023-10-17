import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import MovieInfo from "./views/movieInfo/movieInfo";
import Favorites from "./views/Favorites/Favorites";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/pauflix/",
      element: <Landing />,
    },
    {
      path: "/pauflix/movie-info",
      element: <MovieInfo />,
    },
    {
      path: "/pauflix/favorites",
      element: <Favorites />,
    },
    {
      path: "*",
      element: <Landing />,
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
