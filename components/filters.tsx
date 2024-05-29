"use client";

import { MovieFilterProps } from "@/actions/movies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, qualities, sorts } from "@/lib/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleValueChange(value: string, name: string) {
    const params = Object.fromEntries(searchParams) as MovieFilterProps;
    let url = queryString.stringifyUrl({
      url: pathname,
      query: { ...params, [name]: value },
    });

    if (value === "all" || value === "0") {
      url = queryString.exclude(url, [name]);
    }

    router.replace(url);
  }

  return (
    <div className="flex flex-col items-center gap-5 xl:flex-row xl:justify-between">
      <h1 className="font-semibold uppercase tracking-wide">Movies</h1>
      <div className="grid w-full grid-cols-2 items-center gap-3 md:flex md:w-auto md:grid-cols-none">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs">Quality</h3>
          <Select
            defaultValue={searchParams.get("quality") ?? "all"}
            name="quality"
            onValueChange={(val) => handleValueChange(val, "quality")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Qualities" />
            </SelectTrigger>
            <SelectContent>
              {qualities.map((quality, index) => (
                <SelectItem key={index} value={quality}>
                  {quality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs">Genre</h3>
          <Select
            defaultValue={searchParams.get("genre") ?? "all"}
            name="genre"
            onValueChange={(val) => handleValueChange(val, "genre")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre, index) => (
                <SelectItem key={index} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs">Rating</h3>
          <Select
            defaultValue={searchParams.get("rating") ?? "0"}
            name="rating"
            onValueChange={(val) => handleValueChange(val, "rating")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All</SelectItem>
              {[...Array(9).keys()].reverse().map((index) => (
                <SelectItem key={index} value={`${index + 1}`}>
                  {index + 1}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs">Sort By</h3>
          <Select
            defaultValue={searchParams.get("sort_by") ?? "all"}
            name="sort_by"
            onValueChange={(val) => handleValueChange(val, "sort_by")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {sorts.map((sort, index) => (
                <SelectItem key={index} value={sort.value}>
                  {sort.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
