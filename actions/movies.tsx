"use server";

import { MovieDetails, Movies } from "@/types";
import queryString from "query-string";

const genres = [
  "all",
  "action",
  "adventure",
  "animation",
  "biography",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "film",
  "game",
  "history",
  "horror",
  "music",
  "musical",
  "mystery",
  "news",
  "reality",
  "romance",
  "sci",
  "sport",
  "talk",
  "thriller",
  "war",
  "western",
] as const;

const sorts = [
  "title",
  "year",
  "rating",
  "peers",
  "seeds",
  "download_count",
  "like_count",
  "date_added",
] as const;

const qualities = [
  "480p",
  "720p",
  "1080p",
  "1080p",
  "x265",
  "2160p",
  "3D",
] as const;

export interface MovieFilterProps {
  limit?: number;
  page?: number;
  quality?: (typeof qualities)[number];
  minimum_rating?: number;
  query_term?: string;
  genre?: (typeof genres)[number];
  sort_by?: (typeof sorts)[number];
  order_by?: "desc" | "asc";
  with_rt_ratings?: boolean;
}

export const getMovies = async (filter?: MovieFilterProps): Promise<Movies> => {
  const url = queryString.stringifyUrl({
    url: `${process.env.API_URL}/list_movies.json`,
    query: { ...filter },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Something wrong fetching movies");
  }

  return (await res.json()) as Movies;
};

export const getMovieSuggestions = async (movie_id: number) => {
  const url = queryString.stringifyUrl({
    url: `${process.env.API_URL}/movie_suggestions.json`,
    query: { movie_id },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Something wrong fetching movie suggestions");
  }

  return (await res.json()) as Movies;
};

export interface MovieDetailsProps {
  movie_id?: number;
  imdb_id?: string;
  with_images?: boolean;
  with_cast?: boolean;
}

export const getMovieDetails = async (
  params: MovieDetailsProps,
): Promise<MovieDetails> => {
  const url = queryString.stringifyUrl({
    url: `${process.env.API_URL}/movie_details.json`,
    query: { ...params },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Something wrong fetching movie details");
  }

  return (await res.json()) as MovieDetails;
};
