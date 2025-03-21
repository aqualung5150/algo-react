import { useState } from "react";
import FilterButton from "./filter/FilterButton";

const TagSelector = ({ tags, setTags }: any) => {
  const isSelected = (selectedTag: number) => {
    return tags.includes(selectedTag);
  };

  const setTag = (selectedTag: string) => {
    let updatedTags: string[];
    if (tags.includes(selectedTag)) {
      updatedTags = tags.filter((tag: string) => tag !== selectedTag);
    } else {
      updatedTags = [...tags, selectedTag];
    }

    setTags([...updatedTags]);
  };

  const tagProps = [
    ["DP", "1"],
    ["DFS", "2"],
    ["BFS", "3"],
    ["Implementation", "4"],
    ["Data Structures", "5"],
  ];

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

export default TagSelector;
