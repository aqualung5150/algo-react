import React from "react";
import { SearchParamsProps } from "types/recruitpost";
import FilterButton from "./FilterButton";

const TagFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const tagProps = [
    ["DP", "1"],
    ["DFS", "2"],
    ["BFS", "3"],
    ["Implementation", "4"],
    ["Data Structures", "5"],
  ];

  const tag = searchParams.get("tag");
  const tags = tag ? tag.split(",") : [];

  const isSelected = (selectedTag: string) => {
    return tags.includes(selectedTag);
  };

  const setTag = (selectedTag: string) => {
    let updatedTags: string[];
    if (tags.includes(selectedTag)) {
      updatedTags = tags.filter((tag) => tag !== selectedTag);
    } else {
      updatedTags = [...tags, selectedTag];
    }

    searchParams.set("tag", updatedTags.join(","));
    setSearchParams(searchParams);
  };

  return (
    <ul className="flex flex-wrap gap-2 text-sm lg:flex-row">
      {tagProps.map(([name, param]) => (
        <FilterButton
          key={param}
          displayName={name}
          paramValue={param}
          isSelected={isSelected}
          setSelected={setTag}
        />
      ))}
    </ul>
  );
};

export default React.memo(TagFilter);
