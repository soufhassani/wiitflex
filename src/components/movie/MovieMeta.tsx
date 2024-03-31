type Props = {
  genres?: { id: number; name: string }[];
  original_language?: string;
  release_date?: string;
};

const MovieMeta = ({ genres, original_language, release_date }: Props) => {
  const dataLength = genres?.length || 0;
  return (
    <ul className="flex-1 flex flex-col  gap-2">
      <li className="text-gray-400">
        <h6>
          Genres:{" "}
          {genres?.map((g, index) => (
            <span key={g.id} className="text-gray-400">
              {g.name}
              {index !== dataLength - 1 && ", "}
            </span>
          ))}
        </h6>
      </li>
      <li className="text-gray-400">
        <h6>
          <span className="text-slate-50">Released date: </span>
          <span className="text-slate-400">{release_date}</span>
        </h6>
      </li>
      <li className="text-gray-400">
        <h6>
          Original language:{" "}
          <span className="text-gray-400">{original_language}</span>
        </h6>
      </li>
    </ul>
  );
};

export default MovieMeta;
