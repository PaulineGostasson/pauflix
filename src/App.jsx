import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import MovieInfo from "./views/movieInfo/movieInfo";
import Favorites from "./views/Favorites/Favorites";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/movie-pau/",
      element: <Landing />,
    },
    {
      path: "/movie-pau/movie-info",
      element: <MovieInfo />,
    },
    {
      path: "/movie-pau/favorites",
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
