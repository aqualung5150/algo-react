import React from "react";
import { SearchParamsProps } from "types/recruitpost";
import FilterButton from "./FilterButton";

const TagFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
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

  const tagProps = [
    ["DP", "dp"],
    ["DFS", "dfs"],
    ["BFS", "bfs"],
    ["Implementation", "implementation"],
    ["Data Structures", "data_structures"],
  ];

  return (
    <ul className="flex flex-wrap gap-2 text-sm lg:flex-row">
      {tagProps.map(([d, p]) => (
        <FilterButton
          displayName={d}
          paramValue={p}
          isSelected={isSelected}
          setSelected={setTag}
        />
      ))}
    </ul>
  );
};

export default React.memo(TagFilter);
