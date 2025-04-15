import { useLocation } from "react-router-dom";
import useMovie from "../../../hooks/useMovie";
import VideoPlayer from "../../global/videoPLayer/VideoPlayer";
import { useEffect, useState } from "react";
import { Movie } from "../../../entities/Movies";

const Clips = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const location = useLocation();
  console.log(location.pathname);

  const movieID = location.pathname.split("/")[2];
  const movieType = location.pathname.split("/")[1];
  const { data, isPending, error } = useMovie({
    mediaType: movieType,
    id: Number(movieID),
  });

  useEffect(() => {
    if (data) setMovie(data);
  }, [data]);

  if (error) {
    console.log("error: ", error);
    throw error;
  }
  if (isPending) return <h2 className="text-3xl font-main">Loading...</h2>;

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;

  // console.log("movie!.videos", movie!.videos);

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

  if (!clips || !behindScenes) return null;
  if (!trailer && clips.length < 1 && behindScenes.length < 1)
    return (
      <div className="min-h-[50svh] flex items-center justify-center">
        <h2 className="text-3xl font-main text-center">
          There is clips available for this movie... .
        </h2>
      </div>
    );

  return (
    <section className="px-10 pt-5 pb-20 ">
      <div className="flex flex-col gap-20 ">
        <div className="w-full">
          <VideoPlayer
            video={trailer?.key}
            play={false}
            mute={false}
            showMovieDetails={false}
          />
        </div>
        {clips.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="font-main text-3xl font-semibold ">
              Clips from {movie?.title}
            </h2>
            <div className="flex gap-5">
              {clips?.map((c, indx) =>
                indx < 4 ? (
                  <VideoPlayer
                    key={c.key}
                    video={c.key}
                    play={false}
                    controllerAreHidden={true}
                    showMovieDetails={false}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        )}
        {behindScenes?.length > 0 && (
          <div>
            <h2 className="font-main text-3xl font-semibold ">
              Behind The scene
            </h2>
            <div className="flex gap-5">
              {behindScenes?.map(
                (b, indx) =>
                  indx < 4 && (
                    <VideoPlayer
                      key={b.key}
                      video={b.key}
                      play={false}
                      controllerAreHidden={true}
                      showMovieDetails={false}
                    />
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clips;
