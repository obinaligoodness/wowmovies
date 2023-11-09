"use client"
// pages/index.tsx
import { useState, useEffect } from 'react';
import { MovieCardProps } from '../components/MovieCard';
import Search from '../components/Search';
import MovieCard from '../components/MovieCard';
import SearchResults from '../components/Search';
// import { useRouter } from 'next/router';
// import PickedMovies from './PickedMovie'


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

const Index: React.FC = () => {
  
  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b185e98f105904fe4f059fa1942e06f4"
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieCardProps[]>([]);
  const [isCustomerSearching, setIsCustomerSearching] = useState(false);
  const [query, setquery] = useState("")
 

  async function handlesearch() {
    if(query.length>0){
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
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(data.results)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }}

}
const emptyQuery=()=>{
  setquery("")
}

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
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
    <div className="w-full h-fit bg-gray-900 text-white">
      <div className='w-full md:h-20 h-12  bg-gray-800'>
      <h1 onClick={() => {setIsCustomerSearching(false),emptyQuery()}}  className='text-lg ml-2 text-red-600 md:text-3xl md:ml-4 pt-4'>wowmoviez</h1>
    </div>
      <h1 className='  text-red-600  pt-5 text-xl justify-center flex '>WowMoviez</h1>
      <div className="justify-center flex-row items-center flex ">
      <button onClick={() => {setIsCustomerSearching(false),emptyQuery()}} className="mr-0 w-20 h-10 mt-3 bg-yellow-400 rounded-full">Back</button>
        <input type='text' value={query} onChange={(e) => {setquery(e.target.value); handlesearch()}} autoFocus placeholder='Search movies...' className="  h-10 w-42 ml-8 mt-2 md:ml-4 md:h-10 md:w-96  md:justify-center md:mt-6 rounded-md text-black"></input>
        {/* <button  className="bg-yellow-400 h-10 w-20 rounded-full mt-3 ">Search</button> */}
      </div>
      <Search searchMovies={searchMovies}/>
      
    </div>
  ) :<div className="w-full h-700 bg-gray-900 text-white">
    <div className='w-full md:h-20 h-12  bg-gray-800'>
      <h1  className='text-lg ml-2 text-red-600 md:text-3xl md:ml-4 pt-4'>wowmoviez</h1>
    </div>
    <h1 className=' text-lg ml-10 text-red-600 pt-6  md:pt-16 md:ml-0 md:text-3xl md:justify-center flex '> <span className='text-white mr-2 '>welcome to </span> wowmoviez</h1>
    <div className="md:justify-center md:flex-row md:items-center flex">
  <input type='text' value={query} onChange={(e) => {setquery(e.target.value); handlesearch()}} placeholder='Search movies...' className="h-10 w-42 ml-8 mt-2 md:ml-4 md:h-10 md:w-96  md:justify-center md:mt-6 rounded-md text-black"></input>
  {/* <button onClick={handlesearch} className="bg-yellow-400 h-10 w-20 rounded-full mt-7 ">Search</button> */}
</div>
<div className="grid ml-6  text-white grid-cols-1 md:mr-6 md:grid-cols-4 md:ml-5 md:text-white  justify-center">
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

