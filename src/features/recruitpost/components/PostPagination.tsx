import { useLocation } from "react-router-dom";
import AngleLeft from "assets/angleLeft.svg?react";
import AngleRight from "assets/angleRight.svg?react";
import AngleDoubleLeft from "assets/angleDoubleLeft.svg?react";
import AngleDoubleRight from "assets/angleDoubleRight.svg?react";
import { PaginationProps } from "types/recruitpost";

const PostPagination = ({
  totalCount,
  interval,
  searchParams,
  setSearchParams,
}: PaginationProps) => {
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const lastPage = Math.ceil(totalCount / 20);
  const left = Math.floor((page - 1) / interval) * interval + 1;
  const right = Math.ceil(page / interval) * interval;
  const pageNumbers: number[] = [];
  for (let i = left; i <= right && i <= lastPage; ++i) {
    pageNumbers.push(i);
  }

  const navPage = (to: number) => {
    searchParams.set("page", to.toString());
    setSearchParams(searchParams);
  };

  return (
    <ul className="flex h-14 w-full items-center justify-center gap-1 text-lg font-semibold">
      {page !== 1 && (
        <>
          <li onClick={() => navPage(left === 1 ? 1 : left - interval)}>
            <AngleDoubleLeft className="h-8 w-8 cursor-pointer hover:rounded-md hover:bg-gray-100" />
          </li>
          <li onClick={() => navPage(page === 1 ? page : page - 1)}>
            <AngleLeft className="h-8 w-8 cursor-pointer hover:rounded-md hover:bg-gray-100" />
          </li>
        </>
      )}

      {pageNumbers.map((e) => (
        <li
          key={e}
          className={`h-8 w-fit min-w-8 cursor-pointer rounded-md select-none ${page === e ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
          onClick={() => navPage(e)}
        >
          <span className="flex h-full w-full items-center justify-center p-1">
            {e}
          </span>
        </li>
      ))}
      {page !== lastPage && (
        <>
          <li onClick={() => navPage(page === lastPage ? page : page + 1)}>
            <AngleRight className="h-8 w-8 cursor-pointer hover:rounded-md hover:bg-gray-100" />
          </li>
          <li
            onClick={() =>
              navPage(
                right + 1 > lastPage ? Math.min(lastPage, right) : right + 1,
              )
            }
          >
            <AngleDoubleRight className="h-8 w-8 cursor-pointer hover:rounded-md hover:bg-gray-100" />
          </li>
        </>
      )}
    </ul>
  );
};

export default PostPagination;
