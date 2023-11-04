
"use client"

import { useEffect, useState } from "react";
import { Movie } from "./GetMovies";
import PickedMovie from "./PickedMovie";
import Link from "next/link";

export interface MovieCardProps extends Movie {
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
  const [picked, setpicked] = useState<MovieCardProps | null>(null);
  const [isPicked, setIsPicked] = useState(false)
  const [ids, setid] = useState(0)


  async function pick() {
    const api_pick = `https://api.themoviedb.org/3/movie/${id}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
    try {
      const response = await fetch(api_pick);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setpicked(data);
      if (isPicked === false) {
        setIsPicked(true);
      }
      else { setIsPicked(false) }
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
      <img src={API_IMG + poster_path} alt={title} onClick={pick} className=" ml-6 mr-4  md:ml-8  w-44 h-54 md:w-80 md:h-70 object-cover rounded-t-lg pt-5" />
      <div className=" gap-1 flex md:flex md:items-center md:gap-0">
        <p className="text-xs ml-6 md:ml-8 md:text-xl">{release_date}</p>
        <p className="ml-10 text-xs  md:text-xl md:ml-20">{"Rating: " + vote_average}</p>
        <p onChange={(e) => setid(id)}></p>
      </div>
      <h2 className=" ml-6 text-xs font-normal md:ml-8 md:font-semibold md:text-xl" >{title}</h2>
      {isPicked ? <div className=''>{picked?.overview}</div> : null}
      {/* <PickedMovie movie={picked}></PickedMovie> */}
    </div>

  );
};
export default MovieCard;