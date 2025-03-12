import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NavMobile from "./NavMobile";
import { setToggle } from "../menuSlice";
import NavDesktop from "./NavDesktop";

const Header = () => {
  // useState()
  const toggle = useSelector((state: RootState) => state.menu.toggle);
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 z-10 h-16 w-full border-b-2 border-gray-500 bg-white">
      <nav className="mx-auto flex h-16 w-[92%] items-center justify-between">
        <NavDesktop />
        <NavMobile />
        {toggle ? (
          <p
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(false))}
          >
            닫기
          </p>
        ) : (
          <p
            className="h-10 w-10 lg:hidden"
            onClick={() => dispatch(setToggle(true))}
          >
            열기
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
