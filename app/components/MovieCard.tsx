/* @jsx import() */
"use client"

import { Movie } from "./GetMovies";

export interface MovieCardProps extends Movie{
    poster_path: string;
    original_title: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    id: number;  
    onClick: () => void;
  }

 export const MovieCard: React.FC<MovieCardProps> = ({
    poster_path,
    title,
    release_date,
    vote_average,
    onClick,
  }) => {
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
  
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }} className="hover:animate-pulse hover:translate-y-4">
        <img src={API_IMG + poster_path} alt={title} className="  w-80 h-70 object-cover rounded-t-lg pt-5" />
        <div className="flex items-center gap-10">
          <p>{release_date}</p>
          <p className="ml-20">{"Rating: " + vote_average}</p>
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      
    );
  };
  
  export default MovieCard;
  