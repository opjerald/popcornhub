interface Response {
  status: string;
  status_message: string;
  "@meta": Meta;
}

export interface Movies extends Response {
  data: Data;
}

interface Meta {
  server_time: number;
  server_timezone: string;
  api_version: number;
  execution_time: string;
}

interface Data {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: Movie[];
}

interface MovieBaseData {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  description_full: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  torrents: Torrent[];
  date_uploaded: Date;
  date_uploaded_unix: number;
}

export interface Movie extends MovieBaseData {
  summary: string;
  synopsis: string;
  state: string;
}

export interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: Date;
  date_uploaded_unix: number;
}

export interface MovieDetails extends Response {
  data: {
    movie: Details;
  };
}

interface Details extends MovieBaseData {
  like_count: number;
  description_intro: string;
  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;
  large_screenshot_image1: string;
  large_screenshot_image2: string;
  large_screenshot_image3: string;
  cast: Cast[];
}

export interface Cast {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
}

export interface Datum {
  url: string;
  img: string;
  title: string;
  year: string;
}
