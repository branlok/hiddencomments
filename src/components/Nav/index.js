import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeSVG } from "../../styles/home-svgrepo-com (3).svg";
import { ReactComponent as LogoutSVG } from "../../styles/logout-svgrepo-com (1).svg";
import useLogout from "../Utils/useLogout";
function Nav() {
    
    const mutation = useLogout();    
  return (
    <nav className="h-10 flex justify-between items-center w-full bg-cblue-1000 border-b border-gray-600">
      <div className="text-gray-100 font-bold mx-4 ">HiddenComment</div>
      <div className="flex items-center px-2">
        <Link
          className="flex items-center border rounded-md border-green-500 font-bold text-green-500 hover:bg-green-500 hover:text-gray-200 mx-2 px-2 cursor-pointer transition"
          to="/dashboard"
        >
          Home
          <HomeSVG className="h-4 ml-2 fill-current stroke-2 rounded-md " />
        </Link>
        <div onClick={() => mutation.mutate()}className="flex items-center justify-center font-bold text-red-600 border rounded-md border-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white  px-2 cursor-pointer transition">
          Log out
        </div>
      </div>
    </nav>
  );
}

export default Nav;
