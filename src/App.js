import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// 15d2271c

const API_URL = "http://www.omdbapi.com?apikey=15d2271c";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className='app'>
      <h1>Movies</h1>
      <div className='search'>
        <input
          placeholder='search for movies'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt='search'
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies</h2>
        </div>
      )}
    </div>
  );
}

export default App;
