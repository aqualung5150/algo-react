import React, { useState } from "react";
import { Link } from "react-router";

const NavDesktop = () => {
  return (
    <div className="hidden w-full flex-row items-center bg-white lg:flex">
      <ul className="flex w-full flex-row items-center justify-evenly">
        <li className="cursor-pointer hover:text-blue-500">MENU1</li>
        <li className="cursor-pointer hover:text-blue-500">MENU2</li>
      </ul>
      <Link
        className="flex h-10 w-[100px] flex-col items-center justify-center rounded-xs border border-blue-500 text-base text-blue-500"
        to="login"
      >
        로그인
      </Link>
    </div>
  );
};

export default React.memo(NavDesktop);
