import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function DoNotQualify() {
  return (
    <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col text-white">
      <h1 className="text-xl font-bold"> We only accept videos with comments disabled</h1>
      <p>
        Return to
        <Link to="/" className="text-gray-200">
          <span className="text-blue-500" >Home</span>
        </Link>
      </p>
    </div>
  );
}

export default DoNotQualify;
