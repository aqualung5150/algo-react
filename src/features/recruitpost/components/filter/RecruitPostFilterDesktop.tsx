import React, { useState } from "react";
import OptionFilter from "./OptionFilter";
import { SearchParamsProps } from "types/recruitpost";
import LevelFilter from "./LevelFilter";
import TagFilter from "./TagFilter";

// const 카테고리형식 = {
//   "139": {
//     seq: 139,
//     label: "스마트폰",
//     imageUrl: "",
//     parentSeq: 6,
//     level: 2,
//     path: "/모바일-태블릿/스마트폰",
//     categoryFilter: [
//       { categoryDepth: 1, categorySeq: 6 },
//       { categoryDepth: 2, categorySeq: 139 },
//     ],
//   },
// };

const RecruitPostFilterDesktop = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  return (
    <div className="hidden w-full lg:block">
      <div className="flex w-full gap-2 pb-2 pl-2">
        <h1>검색결과</h1>
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
