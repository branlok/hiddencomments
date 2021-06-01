import React, { useState } from "react";

function VideoPlayer({ videoID }) {
  let [size, setSize] = useState({
    size: "small",
    width: "100%",
    height: "340",
  });
  return (
    <>
      <iframe
        id="player"
        type="text/html"
        width={size.width}
        height={size.height}
        className="border-2 rounded-lg border-black  my-2"
        src={`http://www.youtube.com/embed/${videoID}?enablejsapi=1&origin=https://stoic-nightingale-8bf870.netlify.app`}
        frameBorder="0"
      ></iframe>
      <div className="hidden sm:flex justify-end items-center w-full text-white my-2">
        <button
          className={`mx-2 rounded-full w-8 h-8  hover:bg-cblue-300 ${
            size.size == "small" && "bg-cblue-500"
          }`}
          onClick={() =>
            setSize({ size: "small", width: "100%", height: "340" })
          }
        >
          S
        </button>
        <button
          className={`mx-2 rounded-full w-8 h-8  hover:bg-cblue-300 ${
            size.size == "medium" && "bg-cblue-500"
          }`}
          onClick={() =>
            setSize({ size: "medium", width: "100%", height: "440" })
          }
        >
          M
        </button>
        <button
          className={`mx-2 rounded-full w-8 h-8  hover:bg-cblue-300 ${
            size.size == "large" && "bg-cblue-500"
          }`}
          onClick={() =>
            setSize({ size: "large", width: "180%", height: "540" })
          }
        >
          L
        </button>
      </div>
    </>
  );
}

export default VideoPlayer;
