import { Cast } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface CastCard {
  cast: Cast;
}

const CastCard = ({ cast }: CastCard) => {
  const [image, setImage] = useState(cast.url_small_image);

  return (
    <div className="flex items-center gap-2">
      <Image
        src={image}
        alt={cast.name}
        width={40}
        height={40}
        className="rounded-full border-2 border-white"
        onError={() => setImage("/images/default.jpg")}
      />
      <div className="flex flex-col">
        <p className="font-semibold">{cast.name}</p>
        <p className="text-sm text-foreground/50">{cast.character_name}</p>
      </div>
    </div>
  );
};

export default CastCard;
