import React from "react";
import useMovieQuery from "../../../store/movieStore";
import Video from "../../modal/modal video/Video";
import VideoPlayer from "../../global/VideoPlayer";

const Clips = () => {
  const movie = useMovieQuery((s) => s.selectedMovie);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const trailer = movie?.videos?.results[videoIdx];
  const clips = movie?.videos?.results.filter(
    (element) =>
      element.type === "Clip" ||
      element.type === "Teaser" ||
      element.type === "Featurette"
  );
  const behindScenes = movie?.videos?.results.filter(
    (element) => element.type === "Behind the Scenes"
  );
  console.log("clips: ", clips);
  return (
    <section className="px-10 pt-5 pb-20 ">
      <div className="flex flex-col gap-20 ">
        <div className="w-full">
          <VideoPlayer video={trailer?.key} play={false} mute={false} />
          {/* <Video movie={movie} type="trailer" isPaused={true} /> */}
        </div>
        <div>
          <h2 className="font-main text-3xl font-semibold ">
            Clips from the movie
          </h2>
          <div className="flex">
            {clips?.map((c, indx) =>
              indx < 4 ? (
                <VideoPlayer
                  key={c.key}
                  video={c.key}
                  play={false}
                  controllerAreHidden={true}
                />
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div>
          <h2 className="font-main text-3xl font-semibold ">
            Behind The scene
          </h2>
          <div className="flex">
            {behindScenes?.map((b, indx) =>
              indx < 4 ? (
                <VideoPlayer
                  key={b.key}
                  video={b.key}
                  play={false}
                  controllerAreHidden={true}
                />
              ) : (
                ""
              )
            )}
          </div>
        </div>
        {/* <div className="basis-1/3 w-full h-full flex flex-col items-start justify-between border-r-2 border-[rgba(255,255,255,0.1)]">
          <h2 className="font-main text-2xl font-semibold ">Trailer</h2>
          <h2 className="font-main text-2xl font-semibold ">Clips</h2>
          <h2 className="font-main text-2xl font-semibold ">
            Behind the Scene
          </h2>
        </div> */}
      </div>
    </section>
  );
};

export default Clips;
