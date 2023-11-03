// // SearchResults.tsx

// import React, { useState } from 'react';
// import { MovieCardProps } from './movieCard';
// import MovieCard from './MovieCard';
// import MovieOverview from './MovieOverview';

// interface SearchResultsProps {
//   searchMovies: MovieCardProps[];
// }

// const SearchResults: React.FC<SearchResultsProps> = ({ searchMovies }) => {
//   const [selectedMovie, setSelectedMovie] = useState<MovieCardProps | null>(null);

//   const handleMovieClick = (movie: MovieCardProps) => {
//     setSelectedMovie(movie);
//   };

//   const handleCloseOverview = () => {
//     setSelectedMovie(null);
//   };

//   return (
//     <div>
//       <div className="grid ml-5 grid-cols-4 justify-center">
//         {searchMovies.map((movieres) => (
//           <MovieCard
//             key={movieres.id}
//             poster_path={movieres.poster_path}
//             title={movieres.title}
//             release_date={movieres.release_date}
//             vote_average={movieres.vote_average}
//             overview={movieres.overview}
//             onClick={() => handleMovieClick(movieres)} // Pass the click handler
//           />
//         ))}
//       </div>
//       {selectedMovie && (
//         <MovieOverview overview={selectedMovie.overview} onClose={handleCloseOverview} />
//       )}
//     </div>
//   );
// };


// export const MovieCard: React.FC<Movie> = ({
//     poster_path,
//     title,
//     release_date,
//     vote_average,
//     onClick,
//     id,
//   }) => {
//     const API_IMG = "https://image.tmdb.org/t/p/w500/";
//     const [picked,setpicked] = useState<MovieCardProps | null>(null); 
//     const [isPicked, setIsPicked] = useState(false)
//     const [ids, setid]=useState(0)
  
    
//     async function pick() {
//       const api_pick = `https://api.themoviedb.org/3/movie/${id}?&api_key=b185e98f105904fe4f059fa1942e06f4`;
//       try {
//         const response = await fetch(api_pick);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setpicked(data);
//         if(isPicked===false){
//         setIsPicked(true);}
//         else{setIsPicked(false)}
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//       }
//     }
//     useEffect(() => {
//       console.log(picked);
//     }, [picked]);
  
//     return (
//       <div style={{ cursor: 'pointer' }} className=' hover:-translate-y-2'>
//         <img src={API_IMG + poster_path} alt={title}onClick={pick} className=" w-80 h-70 object-cover rounded-t-lg pt-5" />
//         <div className="flex items-center gap-10">
//           <p>{release_date}</p>
//           <p className="ml-20">{"Rating: " + vote_average}</p>
//           <p  onChange={(e) => setid(id)}></p>
//         </div>
//         <h2 className="text-xl font-semibold" >{title}</h2>
//         {isPicked?<div className=''>{picked?.overview}</div> :null}
//       </div>
    
//     );
//   };


