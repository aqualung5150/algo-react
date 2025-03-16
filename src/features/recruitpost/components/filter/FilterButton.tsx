const FilterButton = ({
  displayName,
  paramValue,
  isSelected,
  setSelected,
}: {
  displayName: string;
  paramValue: string;
  isSelected: (value: string) => boolean;
  setSelected: (value: string) => void;
}) => {
  return (
    <li
      className={`cursor-pointer rounded-xs border px-2 py-1 text-nowrap select-none ${isSelected(paramValue) ? "border-gray-200 bg-gray-200" : "border-gray-400 text-gray-400"}`}
      onClick={() => setSelected(paramValue)}
    >
      {displayName}
    </li>
  );
};

export default FilterButton;
