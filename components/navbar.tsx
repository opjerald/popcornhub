import Link from "next/link";
import { Search } from "lucide-react";

import ModeToggle from "@/components/mode-toggle";
import QuickSearch from "@/components/quick-search";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background py-3 shadow-lg">
      <nav className="mx-auto flex w-[80%] items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-sm font-bold tracking-widest md:text-base xl:text-xl"
          >
            POPCORN
            <span className="ml-2 rounded-lg bg-[#FF9900] px-2 py-1 text-white">
              HUB
            </span>
          </Link>
          <p className="hidden xl:block">
            Download, watch movie, and eat popcorn.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <QuickSearch />
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href="/movies"
                className="whitespace-nowrap text-sm font-semibold"
                replace
              >
                <Search className="block h-7 w-7 sm:hidden" />
                <span className="hidden sm:block">Browse Movie</span>
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
