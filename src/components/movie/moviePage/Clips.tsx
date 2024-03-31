import useMovieQuery from "../../../store/movieStore";
import VideoPlayer from "../../global/videoPLayer/VideoPlayer";

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
  const behindScenes = movie!.videos!.results.filter(
    (element) => element.type === "Behind the Scenes"
  );
  console.log("clips: ", clips);
  return (
    <section className="px-10 pt-5 pb-20 ">
      <div className="flex flex-col gap-20 ">
        <div className="w-full">
          <VideoPlayer video={trailer?.key} play={false} mute={false} />
        </div>
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
                />
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div>
          {behindScenes?.length > 0 && (
            <>
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
                      />
                    )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Clips;
