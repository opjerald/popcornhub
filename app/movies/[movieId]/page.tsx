import { getMovieDetails, getMovieSuggestions } from "@/actions/movies";
import MovieDetails from "@/components/movie-details";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface MovieDetailsPageProps {
  params: {
    movieId: string;
  };
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  async function getDetails() {
    try {
      const movieDetails = await getMovieDetails({
        movie_id: +params.movieId,
        with_cast: true,
        with_images: true,
      });

      if(movieDetails.data.movie.id === 0) {
        return notFound();
      }

      return movieDetails;
    } catch (error) {
      return notFound();
    }
  }

  const movieDetails = await getDetails();
  const movieSuggestions = await getMovieSuggestions(movieDetails.data.movie.id)
  return (
    <section className="relative">
      <div
        className="absolute h-[700px] w-full bg-cover bg-[top_center] bg-no-repeat before:absolute before:inset-x-0 before:mx-auto before:h-[700px] before:w-full before:bg-gradient-to-b before:from-background/70 before:to-background"
        style={{
          backgroundImage: `url(${movieDetails.data.movie.background_image_original})`,
        }}
      ></div>
      <div className="mx-auto w-[80%] py-10">
        <MovieDetails movie={movieDetails} suggestions={movieSuggestions} />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
