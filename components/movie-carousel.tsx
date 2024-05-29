import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "./movie-card";
import { Movie } from "@/types";

interface MovieCarouselProps {
  data: Movie[];
}

const MovieCarousel = ({ data }: MovieCarouselProps) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="space-x-20 p-2 sm:space-x-18 lg:space-x-10 xl:space-x-8">
        {data.map((movie, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 space-y-1 sm:basis-1/3 md:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:flex" />
      <CarouselNext className="hidden xl:flex" />
    </Carousel>
  );
};

export default MovieCarousel;
