import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import React from "react";

const NavMobile = () => {
  const toggle = useSelector((state: RootState) => state.menu.toggle);

  return (
    <div
      className={`fixed left-0 flex w-full flex-col gap-4 bg-white p-4 text-lg shadow duration-500 lg:hidden ${
        toggle ? "top-16" : "top-[-100%]"
      }`}
    >
      <div>
        <ul className="flex flex-col gap-2">
          <li>hello</li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(NavMobile);
