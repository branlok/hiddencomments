import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ReactComponent as QuestionSVG } from "../../styles/question-mark-svgrepo-com.svg";
import { ReactComponent as CloseSVG } from "../../styles/close-svgrepo-com (5).svg";
function Information() {
  let [open, setOpen] = useState(false);
  let { pathname } = useLocation();
  let onWatch = pathname == "/watch" ? true : false;

  useEffect(() => {
    if (open) {
      let targetWindow = document.querySelector(".scrollWindow");
      targetWindow.style.overflow = "hidden";
    } else {
      let targetWindow = document.querySelector(".scrollWindow");
      targetWindow.style.overflow = "unset";
    }
  }, [open]);

  if (open) {
    return (
      <div className="w-full h-full z-10 bg-cblue-400  flex  flex-col justify-center items-center ">
        <CloseSVG
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 h-5 w-5 fill-current text-white"
        />
        <h1 className="text-3xl font-bold text-white ">How to use?</h1>
        <div className="text-white flex flex-col justify-start py-2 p-5">
          <div className="flex sm:flex-row justify-start items-start my-2">
            <div className="flex-none  bg-gray-300 font-bold h-8 w-8 mx-2 rounded-full bg-white flex justify-center items-center text-black">
              1
            </div>
            <div className="text-xs sm:text-lg font-bold text-gray-300  ">
              Find a video which has youtube comments disabled.
            </div>
          </div>
          <div className="flex justify-start items-start my-2">
            <div className=" flex-none bg-gray-300 font-bold h-8 w-8 mx-2 rounded-full bg-white flex justify-center items-center text-black">
              2
            </div>
            <div className="text-xs sm:text-lg  font-bold text-gray-200  ">
              Replace Domain youtube with hiddencomment
              <div>www.youtube.com/watch?v=asdfasd</div>
            </div>
          </div>
          <div className="flex justify-start items-start my-2">
            <div className=" flex-none  bg-gray-300  font-bold h-8 w-8 mx-2 rounded-full bg-white flex justify-center items-center text-black">
              3
            </div>
            <div className="text-xs sm:text-lg font-bold text-gray-200  ">
              Begin commenting!
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`absolute ${
          onWatch ? "top-12 right-2" : "top-5 right-5"
        } opacity-50 hover:opacity-100 `}
      >
        <QuestionSVG
          className="h-5 w-5 fill-current text-white"
          onClick={() => setOpen(true)}
        />
      </div>
    );
  }
}

export default Information;
