"use client"
import { useState } from "react";
import Index from "./components/GetMovies";
import MovieCard, { MovieCardProps } from "./components/MovieCard";
import Search from "./components/Search";
import PickedMovie from "./details/[id]/page";

export default function Home(){
  const [picked, setPicked] = useState<MovieCardProps | null>(null);
  return(
    <div>
  <Index></Index>
</div>

  )}