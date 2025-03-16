import React from "react";
import CheckSVG from "assets/pass-signup.svg?react";
import { SearchParamsProps } from "types/recruitpost";

const OptionFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const state = searchParams.get("state");

  const setQuery = (key: string, value: string) => {
    if (searchParams.get(key)) searchParams.delete(key);
    else searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div
        className="flex cursor-pointer gap-1 font-semibold"
        onClick={() => setQuery("state", "RECRUITING")}
      >
        <CheckSVG
          className={`h-6 w-6 ${state && state === "RECRUITING" ? "stroke-green-500" : "stroke-gray-300"}`}
        />
        <span>모집 중인 글만 보기</span>
      </div>
    </div>
  );
};

export default React.memo(OptionFilter);
