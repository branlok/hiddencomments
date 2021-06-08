import React from "react";
import { ReactComponent as CloseSVG } from "../../styles/close-svgrepo-com (5).svg";
import useRewrite from "../Utils/useRewrite";
function Instruction({ setOpen }) {
  let phrase = useRewrite(["youtube", "hiddencomment"]);
  return (
    <>
      <CloseSVG
        onClick={() => setOpen(false)}
        className="absolute top-5 right-5 h-5 w-5 fill-current text-white"
      />
      <h1 className="text-2xl text-center sm:text-4xl font-bold text-white ">
        How to use?
      </h1>
      <div className="sm:w-10/12 lg:w-3/4 xl:w-1/2 text-white flex flex-col justify-start py-2 p-5 sm:border rounded-lg mt-6">
        <div className="flex sm:flex-row justify-start items-start my-2">
          <div className="flex-none  bg-gray-300 font-bold h-8 w-8 mr-2 rounded-full bg-white flex justify-center items-center text-black">
            1
          </div>
          <div className="text-xs sm:text-lg font-bold text-gray-300  ">
            Find a youtube video which has comments disabled.
          </div>
        </div>
        <div className="flex justify-start items-start my-2">
          <div className=" flex-none bg-gray-300 font-bold h-8 w-8 mr-2 rounded-full bg-white flex justify-center items-center text-black">
            2
          </div>
          <div className="text-xs sm:text-lg  font-bold text-gray-200 w-full  ">
            Replace youtube domain with hiddencomment <br />
            <div className="h-10 flex flex-col justify-center items-center sm:inline text-center items-center bg-cblue-300 rounded-full w-full px-2 mt-2">{`www.${phrase}.com/watch?v=GbbxxPR4Fho`}</div>
          </div>
        </div>
        <div className="flex justify-start items-start my-2">
          <div className=" flex-none  bg-gray-300  font-bold h-8 w-8 mr-2 rounded-full bg-white flex justify-center items-center text-black">
            3
          </div>
          <div className="text-xs sm:text-lg font-bold text-gray-200  ">
            Begin commenting!
          </div>
        </div>
      </div>
    </>
  );
}

export default Instruction;
