import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details">
      <Link to="/movies" className="back-button">← Back to Movies</Link>
      <div className="movie-content">
        <img
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info-detailed">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)}/10</p>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
          <p><strong>Overview:</strong></p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;