import React from "react";

const Footer = () => {
  return (
    <footer className="flex h-20 min-h-20 w-full items-center justify-center gap-4 bg-gray-100 p-5">
      <a
        className="cursor-pointer"
        href="https://github.com/aqualung5150"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <GithubIcon className="h-11 w-11" /> */}
        <p className="rounded-2xl bg-amber-900"></p>
      </a>
      <div className="flex flex-col justify-center italic">
        <span className="font-semibold">최승준</span>
        <span>010.2833.5110</span>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
