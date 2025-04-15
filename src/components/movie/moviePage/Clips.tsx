import useMovieQuery from "../../../store/movieStore";
import VideoPlayer from "../../global/videoPLayer/VideoPlayer";

const Clips = () => {
  const movie = useMovieQuery((s) => s.selectedMovie);

  const videoIdx =
    movie?.videos?.results.findIndex((element) => element.type === "Trailer") ||
    0;
  const trailer = movie?.videos?.results[videoIdx];
  const clips = movie!.videos!.results.filter(
    (element) =>
      element.type === "Clip" ||
      element.type === "Teaser" ||
      element.type === "Featurette"
  );
  const behindScenes = movie!.videos!.results.filter(
    (element) => element.type === "Behind the Scenes"
  );

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
              Clips from {movie.title}
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
