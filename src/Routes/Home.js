import React from "react";
import Logo from "../components/Home/Logo";
import SignInModal from "../components/Home/SignInModal";

function Home() {
  return (
    <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col">
      <Logo />
      <SignInModal />
      <div className="text-white text-xs text-center">
        Project Created By Brandon <br />
        <a
          href="
        https://github.com/branlok/hiddencomments"
          target="__blank"
          className="text-gray-300 font-bold hover:text-white"
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default Home;
