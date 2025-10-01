import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`https://api.tvmaze.com/shows/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.name}</h2>
            <p>Language: {movie.language}</p>
            <p>Rating: {movie.rating?.average || 'N/A'}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
        </div>
    );
};

export default MovieDetails;