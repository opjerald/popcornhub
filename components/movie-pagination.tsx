"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface MoviePaginationProps {
  currentPage: number;
  movieCount: number;
  limit?: number;
  siblingCount?: number;
}

const MoviePagination = ({
  currentPage,
  movieCount,
  limit = 20,
  siblingCount = 1,
}: MoviePaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paginationRange = usePagination({
    currentPage,
    pageSize: limit,
    totalCount: movieCount,
    siblingCount,
  });

  console.log(paginationRange)

  function generateUrl(pageNumber: number) {
    const params = Object.fromEntries(searchParams);
    let url = queryString.stringifyUrl({
      url: pathname,
      query: { ...params, page: pageNumber },
    });

    if (pageNumber === 1) {
      url = queryString.exclude(url, ["page"]);
    }

    return url;
  }

  if(paginationRange?.length === 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationFirst href={generateUrl(1)} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationPrevious
            href={generateUrl(currentPage === 1 ? 1 : currentPage - 1)}
          />
        </PaginationItem>
        {paginationRange?.map((page, index) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={index} className="hidden sm:block">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          if (index + 1 !== paginationRange.length) {
            return (
              <PaginationItem key={index} className="hidden sm:block">
                <PaginationLink
                  href={generateUrl(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        <PaginationItem>
          <PaginationNext
            href={generateUrl(
              currentPage === +paginationRange![paginationRange!.length - 1]
                ? +paginationRange![paginationRange!.length - 1]
                : currentPage + 1,
            )}
          />
        </PaginationItem>
        {currentPage !== +paginationRange![paginationRange!.length - 1] && (
          <PaginationItem>
            <PaginationLast
              href={generateUrl(+paginationRange![paginationRange!.length - 1])}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MoviePagination;
