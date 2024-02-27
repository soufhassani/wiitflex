import React from "react";

type Props = {
  genres?: { id: number; name: string }[];
  original_language?: string;
  vote_count?: number;
};

const MovieDetails = ({ genres, original_language, vote_count }: Props) => {
  const dataLength = genres?.length || 0;
  return (
    <ul className=" flex flex-col gap-2">
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
          Original language:{" "}
          <span className="text-gray-400">{original_language}</span>
        </h6>
      </li>
      <li className="text-gray-400">
        <h6>
          Original language: <span className="text-gray-400">{vote_count}</span>
        </h6>
      </li>
    </ul>
  );
};

export default MovieDetails;
