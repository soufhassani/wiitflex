import React from "react";
import useMovieQuery from "../../../store/movieStore";

const Clips = () => {
  const movie = useMovieQuery((s) => s.selectedMovie);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const trailer = movie?.videos?.results[videoIdx];
  const clips = movie?.videos?.results.filter(
    (element, i) =>
      element.type === "Clip" ||
      element.type === "Behind the Scenes" ||
      (element.type === "Trailer" && videoIdx !== i)
  );
  console.log("clips: ", clips);
  return <section>Clips</section>;
};

export default Clips;
