import Link from "next/link";
import queryString from "query-string";
import { Download, Magnet } from "lucide-react";

import { Torrent } from "@/types";

import { Button } from "@/components/ui/button";

interface TorrentsProps {
  torrents: Torrent[];
  title: string;
}

const Torrents = ({ torrents, title }: TorrentsProps) => {
  function generateMagnetLink(hash: string, title: string) {
    const urlName = queryString.stringify({ title });
    const finalName = urlName.split("=").pop();
    return `magnet:?xt=urn:btih:${hash}&dn=${finalName}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce`;
  }

  return (
    <div className="flex flex-wrap items-center gap-5">
      {torrents.map((torrent, index) => (
        <div key={index} className="flex items-center">
          <Button className="rounded-l-xl rounded-r-none border-0" asChild>
            <Link href={torrent.url} target="_blank">
              <Download className="mr-2 h-5 w-5" />
              <span>
                {torrent.quality}
                {torrent.video_codec === "x265" && `.${torrent.video_codec}`}
                {torrent.bit_depth === "10" && `.${torrent.bit_depth}`}.
                {torrent.type}
              </span>
            </Link>
          </Button>
          <Button variant="outline" className="rounded-r-xl rounded-l-none border-2 border-l-0" asChild>
            <Link
              href={generateMagnetLink(torrent.hash, title)}
              target="_blank"
            >
              <Magnet />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Torrents;
