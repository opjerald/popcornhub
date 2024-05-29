"use client";

import Link from "next/link";

import { Movie } from "@/types";

import { Button } from "@/components/ui/button";
import MovieCarousel from "@/components/movie-carousel";

interface CategoriesProps {
  title: string;
  data: Movie[];
  seeMoreUrl?: string;
}

const Category = ({ data, title, seeMoreUrl }: CategoriesProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h1 className="font-semibold uppercase tracking-wide">{title}</h1>
        {!!seeMoreUrl && (
          <Button
            className="rounded-full border-2 bg-transparent font-semibold text-black hover:border-[#FF9900] hover:bg-[#FF9900] hover:text-white dark:text-white"
            asChild
          >
            <Link href={`${seeMoreUrl}`}>See More</Link>
          </Button>
        )}
      </div>
      <MovieCarousel data={data} />
    </div>
  );
};

export default Category;
