// SingleMovie.tsx
import React from 'react';
import { MovieCardProps } from './MovieCard';

interface SingleMovieProps {
  movie: MovieCardProps | null;
};


const PickedMovie: React.FC<SingleMovieProps> = ({ movie }) => {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  if (!movie) {
    return <div>No movie selected</div>;
  }

  return (
    <div>
      <img src={API_IMG + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>{movie.overview}</p>
    </div>
  );

};

export default PickedMovie;
