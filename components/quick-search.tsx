"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2, Search } from "lucide-react";

import { useClickOutside, useDebounce } from "@/lib/use-hooks";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { getMovies } from "@/actions/movies";
import { Movies } from "@/types";

const QuickSearch = () => {
  const controllerRef = useRef<AbortController | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");

  const [response, setResponse] = useState<Movies | null>(null);
  const debouncedQuery = useDebounce(query, 500);

  useClickOutside(ref, () => {
    setQuery("");
    setResponse(null);
  });

  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    async function getMoviesQuick() {
      let data: Movies | null;

      try {
        if (!!debouncedQuery) {
          data = await getMovies({ query_term: debouncedQuery, limit: 5 });
        } else {
          data = null;
        }

        setResponse(data);
      } catch (e) {
        data = null;
      }
    }

    startTransition(() => getMoviesQuick());
  }, [debouncedQuery]);

  return (
    <div ref={ref} className="relative hidden xl:block">
      <Input
        placeholder="Quick Search"
        className="peer w-[300px] rounded-full px-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="absolute left-2 top-2 text-input peer-focus-visible:text-ring" />
      {isPending && !!query && (
        <Loader2 className="absolute right-2 top-2 animate-spin" />
      )}
      {!!response?.data?.movies && (
        <Card className="absolute left-0 mt-2 flex w-full flex-col gap-5 rounded-md shadow-xl">
          <CardContent className="p-0">
            {response.data.movies.map((movie, index) => (
              <Link
                key={index}
                href={`/movies/${movie.imdb_code}`}
                className="flex items-start gap-3 border-b border-border p-4 last:border-b-0 hover:bg-slate-100 hover:dark:bg-slate-800"
                onClick={() => {
                  setQuery("");
                }}
              >
                <Image
                  src={movie.small_cover_image}
                  alt={movie.title}
                  width={43}
                  height={63}
                  className="h-auto w-auto"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">{movie.title}</p>
                  <span className="text-xs italic">{movie.year}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
      {!response?.data?.movies && !!debouncedQuery && !isPending && (
        <Card className="absolute left-0 mt-2 flex w-full flex-col gap-5 rounded-md shadow-xl">
          <CardContent className="p-0 ">
            <p className="p-5 text-center">No results found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickSearch;
