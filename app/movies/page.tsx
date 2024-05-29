import { getMovies, MovieFilterProps } from "@/actions/movies";
import Filters from "@/components/filters";
import MovieCard from "@/components/movie-card";
import MoviePagination from "@/components/movie-pagination";
import { notFound } from "next/navigation";

interface BrowsePageProps {
  searchParams: MovieFilterProps;
}

const BrowsePage = async ({ searchParams }: BrowsePageProps) => {
  const movies = await getMovies(searchParams);

  if (!movies.data.movies) {
    return notFound();
  }

  return (
    <section className="mx-auto w-[80%] py-10">
      <Filters />
      <div className="grid grid-cols-1 place-items-center gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.data.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <MoviePagination
        currentPage={movies.data.page_number}
        movieCount={movies.data.movie_count}
        siblingCount={1}
      />
    </section>
  );
};

export default BrowsePage;
