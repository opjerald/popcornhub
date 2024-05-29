"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Movie } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  isSmall?: boolean;
}

const MovieCard = ({ movie, isSmall }: MovieCardProps) => {
  const [image, setImage] = useState(movie.medium_cover_image);
  return (
    <Card
      className={cn(
        "border-0 transition-transform hover:scale-105",
        isSmall ? "w-auto" : "w-[210px]",
      )}
    >
      <CardContent className="space-y-2 p-0">
        <Link href={`/movies/${movie.imdb_code}`}>
          <Image
            src={image}
            alt={movie.title_english}
            height={isSmall ? 138 : 315}
            width={isSmall ? 92 : 210}
            className="rounded-xl dark:border-2 dark:border-white"
            onError={() => setImage("/images/default-movie.jpg")}
            priority
          />
        </Link>
        {!isSmall && (
          <div className="flex flex-col items-start gap-1">
            <Link
              href={`/movies/${movie.imdb_code}`}
              className="w-[80%] truncate text-sm font-semibold tracking-wide hover:opacity-75 md:text-base"
            >
              {movie.title}
            </Link>
            <div className="flex w-full items-center gap-2">
              <p className="text-xs opacity-70 md:text-sm">{movie.year}</p>
              <div className="flex items-center gap-1 text-sm">
                <Star fill="#FF9900" className="h-4 w-4 text-[#FF9900]" />
                <span>{movie.rating} / 10</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
