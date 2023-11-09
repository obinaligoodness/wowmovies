"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Movie } from '../../home/page';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
  const [picked, setpicked] = useState<MovieCardProps | null>(null);
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
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>??????????", data)
      setpicked(data);


      console.log("++++++++++++++++++++++DDDDDDDDDD", picked)
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
    console.log("????????????????????????????????????", picked);
  }, [picked]);

  
  useLayoutEffect(() => {
    pick()
    console.log("PPPPPPPPPPPPPPPPP", picked)
  }, [])

  return (
    <div className="w-full h-screen bg-gray-900 md:text-white ">
      <Link href={"/home"}><div className='w-full md:h-16 h-12  bg-gray-800'>
        <h1 className='text-lg ml-2 text-red-600 md:text-3xl md:ml-4 pt-4'>wowmoviez</h1>
      </div></Link>
      <img src={API_IMG + picked?.poster_path} alt={picked?.title} className="mx-auto my-auto h-4/6 mt-14 w-96 object-cover rounded-t-lg" />
      <div className="flex flex-col items-center justify-center">
        <div className="gap-1 flex md:flex md:items-center md:gap-0">
          <p className="text-xs ml-6 md:ml-8 md:text-xl">Release Date: {picked?.release_date}</p>
          <p className="ml-10 text-xs md:text-xl md:ml-20">Rating: {picked?.vote_average}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
  <h2 className="text-red-500 ml-6 text-xs font-normal md:ml-8 md:font-semibold md:text-xl">{picked?.title}</h2>
</div>

      <p className="ml-8 mb-10">{picked?.overview}</p>
    </div>
  );
};


export default PickedMovie;

