import { useEffect, useState } from "react";
import React from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";

// ✅ Use v4 Bearer Token
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let endpoint;

      if (query && query.trim() !== "") {
        // 🔎 search endpoint
        endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`;
      } else {
        // 🎬 discover popular movies by default
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      }

      console.log("Fetching:", endpoint);

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMoviesList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch movies when searchTerm changes (debounced)
  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const handler = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm]);
  // fetch default movies on first render
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy
            without the Hassel
          </h1>

          <button
            onClick={() => fetchMovies(searchTerm)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 "
          >
            Search
          </button><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading movies...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : moviesList.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <li key={movie.id} className="text-white">
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
