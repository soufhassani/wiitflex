type ProductionCompany = {id:number, logo_path:string, name:string, origin_country:string}
type ProductionCountry = {idiso_3166_1:string, name:string}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  videos?: { results: VideosType[] };
  name?: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  original_title?: string;
  is_liked?: boolean
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
}

export type SingleMovie = {
  data: Movie;
};
type VideosType = {
  key: string;
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
};
