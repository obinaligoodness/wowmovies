"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Movie } from '../../components/GetMovies';
import { useParams } from 'next/navigation';
// import { MovieCardProps } from '../components/MovieCard';

// interface SingleMovieProps {
//   movie: MovieCardProps | null
// };
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


const PickedMovie = () => {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const [picked, setpicked] = useState<MovieCardProps|null>(null);
  const [isPicked, setIsPicked] = useState(false)
  const router = useParams()
  let movieId = router.id
  
  async function pick() {
    const api_pick = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
    try {
      const response = await fetch(api_pick);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>??????????",data)
      setpicked(data);
   
  
      console.log("++++++++++++++++++++++DDDDDDDDDD",picked)
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
    console.log("????????????????????????????????????",picked);
  }, [picked]);

  useLayoutEffect(()=>{
    pick()
    console.log("PPPPPPPPPPPPPPPPP",picked)
  },[])

    return (
    <div className="w-full h-screen bg-gray-900 md:text-white ">
          <img src={API_IMG + picked?.poster_path} alt={picked?.title} className=" ml-6 mr-4 md:h-4/5     object-cover rounded-t-lg pt-5" />
          <div className=" gap-1 flex md:flex md:items-center md:gap-0"><p className="text-xs ml-6 md:ml-8 md:text-xl">Release Date: {picked?.release_date}</p>
          <p className="ml-10 text-xs  md:text-xl md:ml-20">Rating: {picked?.vote_average}</p></div>
          <h2 className=" text-red-500 ml-6 text-xs font-normal md:ml-8 md:font-semibold md:text-xl">{picked?.title}</h2>
          <p className="ml-8">{picked?.overview}</p>
    </div>
  );
};


export default PickedMovie;

