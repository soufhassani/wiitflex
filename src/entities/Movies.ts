export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  name?: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
};
