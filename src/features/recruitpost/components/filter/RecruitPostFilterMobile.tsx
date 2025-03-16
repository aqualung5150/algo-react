import AngleDownSVG from "assets/angleDown.svg?react";
import AngleUpSVG from "assets/angleUp.svg?react";
import { useState } from "react";
import OptionFilter from "./OptionFilter";
import { SearchParamsProps } from "types/recruitpost";
import TagFilter from "./TagFilter";
import LevelFilter from "./LevelFilter";

const RecruitPostFilterMobile = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const [openLevel, setOpenLevel] = useState(false);
  const [openTag, setOpenTag] = useState(false);

  return (
    <div className="w-full lg:hidden">
      <div className="flex gap-2 pb-2 pl-2">
        <h1>검색결과</h1>
      </div>
      <div className="flex w-full flex-col border-y-2 border-black">
        <ul>
          <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
            <div className="flex items-center justify-between">
              <span>난이도</span>
              {openLevel ? (
                <AngleUpSVG
                  onClick={() => setOpenLevel(false)}
                  className="h-10 w-10"
                />
              ) : (
                <AngleDownSVG
                  onClick={() => setOpenLevel(true)}
                  className="h-10 w-10"
                />
              )}
            </div>
            {openLevel && (
              <LevelFilter {...{ searchParams, setSearchParams }} />
            )}
          </li>
          <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
            <div className="flex items-center justify-between">
              <span>태그</span>
              {openTag ? (
                <AngleUpSVG
                  onClick={() => setOpenTag(false)}
                  className="h-10 w-10"
                />
              ) : (
                <AngleDownSVG
                  onClick={() => setOpenTag(true)}
                  className="h-10 w-10"
                />
              )}
            </div>
            {openTag && <TagFilter {...{ searchParams, setSearchParams }} />}
          </li>
          <li className="flex min-h-14 w-full flex-col justify-center gap-2 border-b p-2">
            <OptionFilter {...{ searchParams, setSearchParams }} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecruitPostFilterMobile;
