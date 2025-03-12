import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./Footer";
import React from "react";

const Layout = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <Header />
      <main className="mt-16 flex flex-1 justify-center bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
