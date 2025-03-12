import React from "react";

const NavDesktop = () => {
  return (
    <div className="hidden w-full flex-row items-center bg-white lg:flex">
      <ul className="flex w-full flex-row items-center justify-evenly">
        <li>
          <h1>qwer</h1>
        </li>
        <li>
          <h1>asdf</h1>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(NavDesktop);
