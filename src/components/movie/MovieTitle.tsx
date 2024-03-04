import React from "react";

type Props = {
  title: string | undefined;
  name: string | undefined;
};

const MovieTitle = ({ title, name }: Props) => {
  return (
    <div className="flex-1">
      <h2 className="text-slate-50 text-4xl font-main font-semibold">
        {title || name}
      </h2>
    </div>
  );
};

export default MovieTitle;
