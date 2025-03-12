import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NavMobile from "./NavMobile";
import { setToggle } from "../menuSlice";
import NavDesktop from "./NavDesktop";
import { Link } from "react-router";
import MenuIcon from "assets/menu-svgrepo-com.svg?react";
import CloseIcon from "assets/close-svgrepo-com.svg?react";

const Header = () => {
  // useState()
  const toggle = useSelector((state: RootState) => state.menu.toggle);
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 z-10 h-16 w-full border-b-2 border-gray-500 bg-white">
      <nav className="mx-auto flex h-16 w-[92%] items-center justify-between">
        <Link
          to="/"
          className="cursor-pointer text-2xl font-bold text-blue-900"
        >
          ALGO
        </Link>
        <NavDesktop />
        <NavMobile />
        {toggle ? (
          <CloseIcon
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(false))}
          />
        ) : (
          <MenuIcon
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(true))}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
