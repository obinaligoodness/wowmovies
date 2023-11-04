"use client"
import React, { useState } from 'react';
import { MovieCardProps } from './MovieCard';
import { MovieCard } from "./MovieCard";
import MovieOverview from './MovieOverview';


interface SearchResultsProps {
  searchMovies: MovieCardProps[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchMovies }) => {
    const [selectedMovie, setSelectedMovie] = useState<MovieCardProps | null>(null);
  
    const handleMovieClick = (movie: MovieCardProps) => {
      setSelectedMovie(movie);
    };
  
    const handleCloseOverview = () => {
      setSelectedMovie(null);
    };
  
        
    return (
        <div>
            <div className="grid ml-2 :mr-2 text-white grid-cols-1 md:mr-6 md:grid-cols-4 md:ml-5 md:text-green-500  justify-center">
                {searchMovies.map((movieres) => (<MovieCard key={movieres.id}
                    id={movieres.id}
                    title={movieres.title}
                    overview={movieres.overview}
                    poster_path={movieres.poster_path}
                    release_date={movieres.release_date}
                    vote_average={movieres.vote_average}
                    original_title={movieres.original_title}
                    onClick={() => handleMovieClick(movieres)}
                    />))}
            </div>
            {selectedMovie && (
        <MovieOverview overview={selectedMovie.overview} onClose={handleCloseOverview} />
      )}
        </div>
    )
}
export default SearchResults

