import { useEffect, useState } from "react";
import React from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";

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
        endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`;
      } else {
        endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      }

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

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const handler = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="flex flex-col items-center text-center">
          <img src="./hero.png" alt="Hero Banner" className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Find <span className="text-gradient">Movies</span> you'll Enjoy
            without the Hassel
          </h1>

          {/* Modern Search bar */}
          <div className="relative w-full max-w-md mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
              className="w-full pl-4 pr-20 py-3 rounded-full shadow-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={() => fetchMovies(searchTerm)}
              className="absolute right-1 top-1 bottom-1 px-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition"
            >
              Search
            </button>
          </div>
        </header>

        <section className="all-movies mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading movies...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : moviesList.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {moviesList.map((movie) => (
                <li
                  key={movie.id}
                  className="bg-gray-800 rounded-lg p-3 shadow hover:shadow-lg transition"
                >
                  <p className="text-white font-medium">{movie.title}</p>
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
