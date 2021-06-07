import React from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useQuery } from "react-query";
import CommentMaker from "../components/VideoPost/CommentMaker";
import CommentViewer from "../components/VideoPost/CommentViewer";
import VideoNotFound from "../components/VideoPost/Resources/VideoNotFound";
import DoNotQualify from "../components/VideoPost/Resources/DoNotQualify";
import FullPageLoading from "../components/VideoPost/Resources/FullPageLoading";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPost/VideoPlayer";
import RecentlyAdded from "../components/VideoPost/RecentlyAdded";
import axiosInstance from "../helpers/axios";
import { ReactComponent as HomeSVG } from "../styles/home-svgrepo-com (2).svg";
function Watch() {
  let location = useLocation();
  let parsed = queryString.parse(location.search).v;

  let query = useQuery(["videoPost", parsed], () => {
    return axiosInstance.get(`/watch?v=${parsed}`).then((res) => res.data);
  });

  console.log(queryString.parse(location.search).v);

  if (query.isSuccess) {
    console.log(query.data.message);
    if (query.data.message == "videoNotFound") {
      return <VideoNotFound />;
    } else if (query.data.message == "video has comments enabled") {
      return <DoNotQualify />;
    }
    return (
      //TOPIC

      <div className="no-scrollbar bg-cblue-400 h-auto w-full flex justify-center items-center flex-col overflow-x-hidden">
        <nav className="h-10 flex justify-between items-center w-full bg-cblue-1000 border-b border-gray-600">
          <div className="text-gray-100 font-bold mx-4 ">HiddenComment</div>
          <Link to="/dashboard">
            <HomeSVG className="fill-current text-gray-200 mx-2 rounded-md hover:bg-gray-500 p-1" />
          </Link>
        </nav>
        <section className="my-4 w-full lg:w-1/2 lg:px-0 px-4 m-auto flex items-center flex-col">
          <h1 className="text-xl font-bold text-white my-2">
            <a href={`https://www.youtube.com/watch?v=${query.data.video_id}`}>
              {query.data.title}
            </a>
          </h1>
          {/* <img src={query.data.thumbnail} /> */}
          <VideoPlayer videoID={query.data.video_id} />

          <CommentMaker videoId={parsed} />
          <RecentlyAdded />
        </section>
        <section className="bg-cblue-500 w-full h-full pb-40">
          <CommentViewer videoId={parsed} />
        </section>
      </div>
    );
  } else if (query.isLoading) {
    return <FullPageLoading />;
  } else {
    return <div>failed </div>;
  }
}

export default Watch;

//conditional render, if the url exists in database
// VIDEO IS NOT FOUND IN DATABASE -
// YES - Render the base output
// NO - it doesn't exists in database,
//      -> is a valid youtubel link ?
//          -> give option to create discussion
//      -> return not a valid link.
// VIDEO IS FOUND IN -
