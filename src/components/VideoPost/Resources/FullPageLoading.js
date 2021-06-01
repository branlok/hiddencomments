import React from "react";
import { ReactComponent as LoadingSVG } from "../../../styles/spinner-two-svgrepo-com.svg";
function FullPageLoading() {
  return (
    <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col">
      <LoadingSVG className="fill-current text-white animate-spin w-10 h-10" />
      <p className="text-white font-weght bold my-2">Loading</p>
    </div>
  );
}

export default FullPageLoading;
