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

// export default SearchResults;
