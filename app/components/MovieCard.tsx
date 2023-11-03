
"use client"

import { useEffect, useState } from "react";
import { Movie } from "./GetMovies";
import PickedMovie from "./PickedMovie";
import Link from "next/link";

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

 
export const MovieCard: React.FC<Movie> = ({
    poster_path,
    title,
    release_date,
    vote_average,
    onClick,
    id,
  }) => {
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
    const [picked,setpicked] = useState<MovieCardProps | null>(null); 
    const [isPicked, setIsPicked] = useState(false)
    const [ids, setid]=useState(0)
  
    
    async function pick() {
      const api_pick = `https://api.themoviedb.org/3/movie/${id}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
      try {
        const response = await fetch(api_pick);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setpicked(data);
        if(isPicked===false){
        setIsPicked(true);}
        else{setIsPicked(false)}
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    useEffect(() => {
      console.log(picked);
    }, [picked]);
  
    return (
      <div style={{ cursor: 'pointer' }} className=' hover:-translate-y-2'>
  <Link href="wowmovies\app\components\PickedMovie.tsx"><img src={API_IMG + poster_path} alt={title}onClick={pick} className=" w-80 h-70 object-cover rounded-t-lg pt-5" /></Link>
        <div className="flex items-center gap-10">
          <p>{release_date}</p>
          <p className="ml-20">{"Rating: " + vote_average}</p>
          <p  onChange={(e) => setid(id)}></p>
        </div>
        <h2 className="text-xl font-semibold" >{title}</h2>
        {isPicked?<div className=''>{picked?.overview}</div> :null}
        <PickedMovie movie={picked}></PickedMovie>
      </div>
    
    );
  };
  export default MovieCard;