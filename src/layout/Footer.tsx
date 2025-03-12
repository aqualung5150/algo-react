import React from "react";
import GithubSVG from "assets/github-mark.svg?react";

const Footer = () => {
  return (
    <footer className="flex h-20 min-h-20 w-full items-center justify-center gap-4 bg-gray-100 p-5">
      <a
        className="cursor-pointer"
        href="https://github.com/aqualung5150"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubSVG className="h-11 w-11" />
      </a>
      <div className="flex flex-col justify-center italic">
        <span className="font-semibold">최승준</span>
        <span>010.2833.5110</span>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
