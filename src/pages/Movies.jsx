import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('https://api.tvmaze.com/shows')
            .then(res => {
                setMovies(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {loading ? (
                <p>Loading movies...</p>
            ) : error ? (
                <p>Failed to fetch movies</p>
            ) : filtered.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <MovieList movies={filtered} />
            )}
        </div>
    );
};

export default Movies;
