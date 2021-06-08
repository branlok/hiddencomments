import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ReactComponent as QuestionSVG } from "../../styles/question-mark-svgrepo-com.svg";
import { ReactComponent as CloseSVG } from "../../styles/close-svgrepo-com (5).svg";
import useRewrite from "../Utils/useRewrite";
import Instruction from "./Instruction";
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
  useEffect(() => {
      console.log("rerendered")
  })
  if (open) {
    return (
      <div className="w-full h-full z-10 bg-cblue-400  flex  flex-col justify-center items-center ">
        <Instruction setOpen={setOpen}/>
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
