import { notFound } from "next/navigation";

import { getMovies, MovieFilterProps } from "@/actions/movies";

import Filters from "@/components/filters";
import MovieCard from "@/components/movie-card";
import MoviePagination from "@/components/movie-pagination";

interface BrowsePageProps {
  searchParams: MovieFilterProps;
}

const BrowsePage = async ({ searchParams }: BrowsePageProps) => {
  const result = await getMovies(searchParams);

  return (
    <section className="mx-auto w-[80%] py-10">
      <Filters />
      {!!result.data.movies ? (
        <div className="grid grid-cols-1 place-items-center gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {result.data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-10">
          <h1>
            Did not match any movies for your search &quot;
            <span className="font-bold">{searchParams.query_term}</span>&quot;
          </h1>
        </div>
      )}
      <MoviePagination
        currentPage={result.data.page_number}
        movieCount={result.data.movie_count}
        siblingCount={1}
      />
    </section>
  );
};

export default BrowsePage;
