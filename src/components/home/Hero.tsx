import React from "react";
import useMovies from "../../hooks/useMovies";

const Hero = () => {
  const movies = useMovies();
  console.log(movies);
  return <div>Hero</div>;
};

export default Hero;
