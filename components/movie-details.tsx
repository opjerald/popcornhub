"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Download, PlayCircle, Star, ThumbsUp } from "lucide-react";

import { MovieDetails as Details, Movies } from "@/types";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CastCard from "@/components/cast-card";
import Torrents from "./torrents";
import Category from "./category";
import MovieCard from "./movie-card";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface MovieDetailsProps {
  movie: Details;
  suggestions: Movies;
}

const MovieDetails = ({ movie: { data }, suggestions }: MovieDetailsProps) => {
  const [seeMore, setSeeMore] = useState(false);
  const [movieImage, setMovieImage] = useState(data.movie.large_cover_image);
  const totalHour = (data.movie.runtime / 60).toFixed(2);

  const statistics = [
    {
      name: "rating",
      value: `${data.movie.rating} / 10`,
      icon: <Star fill="#FF9900" className="text-[#FF9900]" />,
    },
    {
      name: "likes",
      value: data.movie.like_count,
      icon: <ThumbsUp />,
    },
  ];

  const screnshots = [
    data.movie.large_screenshot_image1,
    data.movie.large_screenshot_image2,
    data.movie.large_screenshot_image3,
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="z-[2] flex flex-col items-start gap-10 lg:flex-row">
        {/* Image */}
        <div className="flex w-full flex-col items-center justify-center rounded-xl lg:block lg:w-auto">
          <div
            className={cn(
              "group relative flex w-full items-center justify-center",
              data.movie.yt_trailer_code && "hover:cursor-pointer",
            )}
          >
            <Link
              href={`https://youtube.com/watch?v=${data.movie.yt_trailer_code}`}
              target="_blank"
              className="absolute inset-x-0 mx-auto flex h-full w-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 md:hidden"
            >
              <PlayCircle className="h-20 w-20 text-white" />
            </Link>
            {data.movie.yt_trailer_code && (
              <Dialog>
                <DialogTrigger className="absolute inset-x-0 mx-auto hidden h-full w-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                  <PlayCircle className="h-20 w-20 text-white" />
                </DialogTrigger>
                <DialogContent
                  className={cn(
                    !!data.movie.yt_trailer_code
                      ? "w-[690px] max-w-3xl border-0 bg-transparent shadow-none"
                      : "border-1 bg-background shadow-xl",
                  )}
                >
                  <ReactPlayer
                    url={`https://youtube.com/watch?v=${data.movie.yt_trailer_code}`}
                  />
                </DialogContent>
              </Dialog>
            )}
            <Image
              src={movieImage}
              alt={data.movie.title + " download"}
              width={300}
              height={400}
              className="rounded-xl border-[3px] border-white"
              onError={() => setMovieImage("/images/default-movie.jpg")}
            />
          </div>
        </div>
        <div className="flex-1 space-y-5">
          {/* Basic Info */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-wide">
              {data.movie.title}{" "}
              <span className="font-normal tracking-normal">
                ({data.movie.year})
              </span>
            </h1>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              {!!data.movie.mpa_rating && (
                <p className="border border-slate-400 px-2 py-1 text-slate-400">
                  {data.movie.mpa_rating}
                </p>
              )}
              <p>{dayjs(data.movie.date_uploaded).format("MM/DD/YYYY")}</p>
              <span className="hidden md:inline-block">•</span>
              <div className="space-x-2">
                {data.movie.genres.map((genre, index) => (
                  <Link
                    key={index}
                    href={`/movies?genre=${genre.toLowerCase()}`}
                    className="underline underline-offset-4"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              <span className="hidden md:inline-block">•</span>
              <p>{totalHour}hr</p>
            </div>
          </div>
          {/* Statistics */}
          <div className="flex flex-col gap-2">
            {statistics.map((statistic, index) => (
              <div key={index} className="flex items-center gap-2">
                {statistic.icon}
                <p className="text-lg capitalize">{statistic.value}</p>
              </div>
            ))}
          </div>
          {/* Description */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-xl font-semibold">Plot Summary</h1>
            <p className={cn(!seeMore && "line-clamp-4")}>
              {data.movie.description_full.split("—")[0]}
            </p>
            <Button variant="link" onClick={() => setSeeMore((prev) => !prev)}>
              {seeMore ? "See less" : "See more"}
            </Button>
          </div>
          {/* Casts */}
          {data.movie.cast && (
            <div className="space-y-5">
              <h1 className="text-xl font-semibold">Top Casts</h1>
              <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-10">
                {data.movie.cast.map((cast, index) => (
                  <CastCard key={index} cast={cast} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screenshots */}
      <div className="z-[2] space-y-5">
        <h1 className="text-center text-2xl lg:text-left">Screenshots</h1>
        <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
          {screnshots.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger>
                <Image
                  src={image}
                  alt={data.movie.title}
                  width={386.094}
                  height={162.156}
                  className="rounded-lg border-2 border-white"
                />
              </DialogTrigger>
              <DialogContent className="max-w-7xl border-0 bg-transparent shadow-none">
                <Image
                  src={image}
                  alt={data.movie.title}
                  width={1280}
                  height={536}
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      {/* Torrents */}
      <div className="space-y-5">
        <h1 className="text-2xl">Torrents</h1>
        <Torrents
          torrents={data.movie.torrents}
          title={data.movie.title_long}
        />
      </div>

      {/* Suggestions */}
      <div className="space-y-5">
        <h1 className="text-2xl">Similar movies</h1>
        <div className="flex flex-wrap items-center gap-5">
          {suggestions.data.movies.map((movie, index) => {
            if (movie.id === 0) {
              return null;
            }
            return <MovieCard key={index} movie={movie} isSmall />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
