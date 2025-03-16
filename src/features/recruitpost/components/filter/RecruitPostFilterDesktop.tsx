import React from "react";
import OptionFilter from "./OptionFilter";
import { SearchParamsProps } from "types/recruitpost";
import LevelFilter from "./LevelFilter";
import TagFilter from "./TagFilter";

const RecruitPostFilterDesktop = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  return (
    <div className="hidden w-full lg:block">
      <div className="flex w-full gap-2 pb-2 pl-2">
        <h1>검색옵션</h1>
      </div>
      <table className="filter-table w-full">
        <tbody>
          <tr>
            <td>옵션</td>
            <td>
              <LevelFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>
              <TagFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
          <tr>
            <td>옵션</td>
            <td>
              <OptionFilter {...{ searchParams, setSearchParams }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(RecruitPostFilterDesktop);
