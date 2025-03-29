import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { createCookieSessionStorage, Link, useLocation } from "react-router";
import Cookies from "js-cookie";

const NavDesktop = () => {
  const member = useSelector((state: RootState) => state.member);
  const pathname = useLocation().pathname;

  return (
    <div className="hidden w-full flex-row items-center bg-white lg:flex">
      <ul className="flex w-full flex-row items-center justify-evenly">
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="recruit-posts">스터디모집</Link>
        </li>
        <li className="cursor-pointer hover:text-blue-500">
          <Link to="my-study">나의스터디</Link>
        </li>
      </ul>
      {member.id ? (
        <Link
          className="flex h-10 w-[100px] flex-col items-center justify-center rounded-xs border border-blue-500 text-base text-blue-500"
          to={`/members/${member.id}`}
        >
          {member.username}
        </Link>
      ) : (
        <Link
          onClick={() =>
            Cookies.set("redirectUrl", pathname, { expires: 1, path: "/" })
          }
          className="flex h-10 w-[100px] flex-col items-center justify-center rounded-xs border border-blue-500 text-base text-blue-500"
          to="login"
        >
          로그인
        </Link>
      )}
    </div>
  );
};

export default React.memo(NavDesktop);
