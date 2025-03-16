import React from "react";
import { SearchParamsProps } from "types/recruitpost";
import FilterButton from "./FilterButton";

const LevelFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const level = searchParams.get("level");

  const isSelected = (selectedLevel: string) => {
    return level === selectedLevel;
  };

  const setLevel = (selectedLevel: string) => {
    if (level && level === selectedLevel) {
      searchParams.delete("level");
    } else {
      searchParams.set("level", selectedLevel);
    }
    setSearchParams(searchParams);
  };

  const levelProps = [
    ["Bronze", "bronze"],
    ["Silver", "silver"],
    ["Gold", "gold"],
    ["Platinum", "platinum"],
    ["Diamond", "diamond"],
  ];

  return (
    <ul className="flex flex-wrap gap-2 text-sm lg:flex-row">
      {levelProps.map(([display, value]) => (
        <FilterButton
          displayName={display}
          paramValue={value}
          isSelected={isSelected}
          setSelected={setLevel}
        />
      ))}
    </ul>
  );
};

export default React.memo(LevelFilter);
