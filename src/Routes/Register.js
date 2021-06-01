import React from "react";
import Logo from "../components/Home/Logo";
import RegisterModal from "../components/RegisterModal/index";

function Register() {
  return (
    <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col">
        <Logo/>
        <RegisterModal/>

    </div>
  );
}

export default Register;
