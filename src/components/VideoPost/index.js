import React from "react";
import VideoPlayer from "./VideoPlayer";

function index({ videoID, videoTitle }) {
    console.log(videoTitle);
  return (
    <>
      <h1 className="text-xl font-bold text-white my-2">
        <a href={`https://www.youtube.com/watch?v=${videoID}`}>{videoTitle}</a>
      </h1>
      <VideoPlayer videoID={videoID}/>
    </>
  );
}

export default index;
