import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { setToggle } from "layout/menuSlice";
import AngleUpIcon from "assets/angleUp.svg?react";
import AngleDownIcon from "assets/angleDown.svg?react";
import { logout } from "features/member/memberSlice";

const NavMobile = () => {
  const dispatch = useDispatch();
  const member = useSelector((state: RootState) => state.member);
  const toggle = useSelector((state: RootState) => state.menu.toggle);

  const [openMypage, setOpenMypage] = useState(false);

  useEffect(() => {
    if (!toggle) setOpenMypage(false);
  }, [toggle]);

  return (
    <div
      className={`fixed left-0 flex w-full flex-col gap-4 bg-white p-4 text-lg shadow duration-500 lg:hidden ${
        toggle ? "top-16" : "top-[-100%]"
      }`}
    >
      <div>
        <ul className="flex flex-col gap-2">
          <li onClick={() => dispatch(setToggle(false))}>
            <Link to={"recruit-posts"}>스터디</Link>
          </li>
          {member.id ? (
            <>
              <li
                onClick={() => setOpenMypage(!openMypage)}
                className="flex items-center justify-between text-blue-500"
              >
                <span>{member.username}</span>
                {openMypage ? (
                  <AngleUpIcon className="h-7 w-7" />
                ) : (
                  <AngleDownIcon className="h-7 w-7" />
                )}
              </li>
              {openMypage && (
                <ul onClick={() => dispatch(setToggle(false))}>
                  <li>
                    <Link to={`/members/${member.id}`}>- 내 정보</Link>
                  </li>
                  <li>
                    <Link to={`/members/${member.id}/edit`}>- 정보 수정</Link>
                  </li>
                  <li
                    className="mt-5 text-sm text-gray-500"
                    onClick={() =>
                      dispatch(logout(import.meta.env.VITE_BASE_URL))
                    }
                  >
                    로그아웃
                  </li>
                </ul>
              )}
            </>
          ) : (
            <li className="text-blue-500">
              <Link to="login">로그인</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(NavMobile);
