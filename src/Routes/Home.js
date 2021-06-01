import React from "react";
import Logo from "../components/Home/Logo";
import SignInModal from "../components/Home/SignInModal";

function Home() {
  return (
    <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col">
      <Logo />
      <SignInModal />
    </div>
  );
}

export default Home;
