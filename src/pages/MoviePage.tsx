import React from "react";
import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import Spinner from "../components/global/Spinner";

const MoviePage = () => {
  // const { slug } = useParams();
  const { type, id } = useParams();
  const theID = Number(id);

  const { data, isLoading, error } = useMovie({ id: theID, mediaType: type });

  if (error) throw error;

  if (isLoading) return <Spinner />;
  console.log("data: ", data);

  return <div className="text-sky-50">{data?.name}</div>;
};

export default MoviePage;
