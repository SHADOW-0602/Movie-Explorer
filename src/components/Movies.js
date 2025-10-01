import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    if (!title) return;
    try {
      const response = await fetch(`${API_URL}${title}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    searchMovies('avengers');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  return (
    <div className="movies">
      <h1>Movies</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="movies-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date?.split('-')[0]}</p>
              <p>⭐ {movie.vote_average?.toFixed(1)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;