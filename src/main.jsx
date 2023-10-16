import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FavoriteMoviesProvider } from "./components/LocalStorageContext/LocalStorageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoriteMoviesProvider>
      <App />
    </FavoriteMoviesProvider>
  </React.StrictMode>
);
