import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center gap-5 px-4 md:px-0">
      <h1 className="text-xl md:text-2xl text-center">
        Oops! We cannot find the page you are looking for.
      </h1>
      <Button
        className="bg-[#FF9900] text-white hover:bg-[#FF9900]/80"
        asChild
      >
        <Link href="/">
          <MoveLeft className="mr-2" />
          Back to Homepage
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
