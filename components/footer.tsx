"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-200 py-5 dark:bg-slate-900">
      <div className="mx-auto flex w-[80%] items-center flex-col sm:flex-row justify-between gap-2">
        <div className="flex space-x-5">
          <p className="text-sm">
            Made by <span className="font-bold tracking-widest">OPJD</span>{" "}
            &copy; {new Date().getFullYear()}
          </p>
          <div className="hidden sm:flex items-center gap-3">
            <Link href="https://facebook.com/opjerald" target="_blank">
              <Image
                src="https://cdn.simpleicons.org/facebook/black/white"
                alt="facebook"
                height={20}
                width={20}
              />
            </Link>
            <Link href="https://github.com/opjerald" target="_blank">
              <Image
                src="https://cdn.simpleicons.org/github/black/white"
                alt="facebook"
                height={20}
                width={20}
              />
            </Link>
          </div>
        </div>
        <p className="text-sm">
          Powered by{" "}
          <Link
            href="https://yts.mx"
            target="_blank"
            className="font-bold underline underline-offset-2"
          >
            YTS.MX
          </Link>{" "}
          API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
