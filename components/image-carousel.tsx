import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel
      className="w-full "
      opts={{
        align: "start",
        loop: true
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <Image src={image} alt={`screenshot ${index + 1}`} width={1280} height={536} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:flex left-0" />
      <CarouselNext className="hidden xl:flex right-0" />
    </Carousel>
  );
};

export default ImageCarousel;
