import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./Footer";
import React from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "./menuSlice";

const Layout = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex h-dvh w-dvw flex-col">
      <Header />
      <main
        onClick={() => dispatch(setToggle(false))}
        className="mt-16 flex flex-1 justify-center bg-white"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
