"use client"
// pages/index.tsx
import { useState, useEffect } from 'react';
import { MovieCardProps } from './MovieCard';
import Search from './Search';
import { useRouter } from 'next/router';


export type Movie = {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  onClick: () => void;
};

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
      <img src={API_IMG + poster_path} alt={title}onClick={pick} className=" w-80 h-70 object-cover rounded-t-lg pt-5" />
      <div className="flex items-center gap-10">
        <p>{release_date}</p>
        <p className="ml-20">{"Rating: " + vote_average}</p>
        <p  onChange={(e) => setid(id)}></p>
      </div>
      <h2 className="text-xl font-semibold" >{title}</h2>
      {isPicked?<div className=''>{picked?.overview}</div> :null}
    </div>
  );
};

const Index: React.FC = () => {
  
  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b185e98f105904fe4f059fa1942e06f4"
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieCardProps[]>([]);
  const [isCustomerSearching, setIsCustomerSearching] = useState(false);
  const [query, setquery] = useState("")
 

  async function handlesearch() {
    const api_search = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=b185e98f105904fe4f059fa1942e06f4`
    const queryParams = new URLSearchParams({ api_key: api_search, q: query });
    try {
        const response = await fetch(`${api_search}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchMovies(data.results)
        setIsCustomerSearching(true)
        // rou
        console.log(data.results)
        console.log("what a  happy day ++++++++++++++++++++")
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          //   console.log(data.results)
          setMovies(data.results);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchMovies();
  }, [API_URL]);

  console.log(movies)

  return isCustomerSearching ? (
    <div className="w-full h-700 bg-gray-900 text-white">
      <h1 className='  text-red-600  pt-5 text-xl justify-center flex '>WowMoviez</h1>
      <div className="justify-center flex-row items-center flex ">
      <button onClick={() => setIsCustomerSearching(false)} className="mr-0 w-20 h-10 mt-3 bg-yellow-400 rounded-full">Back</button>
        <input type='text' value={query} onChange={(e) => setquery(e.target.value)} placeholder='Search movies...' className=" h-10 w-96  justify-center mt-3 rounded-md text-black"></input>
        <button onClick={handlesearch} className="bg-yellow-400 h-10 w-20 rounded-full mt-3 ">Search</button>
      </div>
      <Search searchMovies={searchMovies}/>
      
    </div>
  ) :<div className="w-full h-700 bg-gray-900 text-white"><div className="justify-center flex-row items-center flex">
  <input type='text' value={query} onChange={(e) => setquery(e.target.value)} placeholder='Search movies...' className=" h-10 w-96  justify-center mt-10 rounded-md text-black"></input>
  <button onClick={handlesearch} className="bg-yellow-400 h-10 w-20 rounded-full mt-10 ">Search</button>
</div>
<div className="grid ml-5 grid-cols-4 justify-center">
  {movies.map((moviereq) => (
    <MovieCard key={moviereq.id}
      id={moviereq.id}
      title={moviereq.title}
      overview={moviereq.overview}
      poster_path={moviereq.poster_path}
      release_date={moviereq.release_date}
      vote_average={moviereq.vote_average}
      original_title={moviereq.original_title}
      onClick={moviereq.onClick}
    />
  ))}
</div>
</div>;
};

export default Index;
