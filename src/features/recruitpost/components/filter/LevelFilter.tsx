import React from "react";
import { SearchParamsProps } from "types/recruitpost";
import FilterButton from "./FilterButton";

const LevelFilter = ({ searchParams, setSearchParams }: SearchParamsProps) => {
  const levelProps = [
    ["Bronze", "1"],
    ["Silver", "2"],
    ["Gold", "3"],
    ["Platinum", "4"],
    ["Diamond", "5"],
  ];

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

  return (
    <ul className="flex flex-wrap gap-2 text-sm lg:flex-row">
      {levelProps.map(([name, param]) => (
        <FilterButton
          key={param}
          displayName={name}
          paramValue={param}
          isSelected={isSelected}
          setSelected={setLevel}
        />
      ))}
    </ul>
  );
};

export default React.memo(LevelFilter);
