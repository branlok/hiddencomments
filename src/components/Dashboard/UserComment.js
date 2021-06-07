import React from "react";
import { ReactComponent as LinkSVG } from "../../styles/external-svgrepo-com.svg";
import TimeAgo from "react-timeago";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

function UserComment({ item }) {
  return (
    <div
      className="w-full flex align-stretch"
    >
      <div
        className={`relative sm:w-3/4 flex-none transition-all hover:border-gray-700  relative min-h-28 w-full bg-cblue-300 px-4 py-4  mr-2 my-2 rounded-md flex flex-col border-2 border-gray-500  transition`}
      >
        <h1 className="font-bold text-white text-md border-b-2 border-gray-600">
          {item.title}
        </h1>
        <div className="w-full flex items-center">
          <h1 className="font-bold text-gray-200">{item.username}</h1>
          <TimeAgo
            className="mx-2 text-xs text-gray-400"
            date={DateTime.fromISO(item.created_on).toLocal().toJSDate()}
            minPeriod="30"
          />
        </div>
        <p className="text-white text-gray-300">{item.body}</p>
        <div className="absolute bottom-2 right-2 h-5 w-full flex justify-end">
          <Link to={`/watch?v=${item.video_id}`}>
            <LinkSVG className="h-5 w-5 fill-current text-white" />
          </Link>
        </div>
      </div>
      <div className="hidden sm:block flex align-stretch overflow-hidden border-white border-2 w-full  bg-cblue-500  p-2 my-2 rounded-md  border-2 border-gray-500">
        <img
          className="rounded-sm object-cover h-32 w-full "
          src={item.thumbnail}
        ></img>
      </div>
    </div>
  );
}

export default UserComment;
