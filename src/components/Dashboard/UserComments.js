import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ReactComponent as LinkSVG } from "../../styles/external-svgrepo-com.svg";
function UserComments() {
  const query = useQuery("ownComments", () => {
    return axios
      .get("http://localhost:3006/comments/own", {
        withCredentials: true,
      })
      .then((res) => res.data);
  });

  if (query.isSuccess) {
    return (
      <div>
        <h1 className="text-2xl text-white font-bold sm:text-3xl">History</h1>
        {query.data.map((item) => {
          return (
            <div
              className={`sm:w-3/4 ransition-all hover:border-gray-700 overflow-hidden relative min-h-24 w-full bg-cblue-300 px-4 py-4  my-2 rounded-md flex flex-col border-2 border-gray-500  transition`}
            >
              <div className="w-full flex items-center">
                <h1 className="font-bold text-white">{item.username}</h1>
                <p className="px-2 text-gray-500 text-xs">3 days ago</p>
              </div>
              <p className="text-white text-gray-300">{item.body}</p>
              <div className="absolute bottom-2 right-2 h-5 w-full flex justify-end">
                <Link to={`/watch?v=${item.video_id}`}>
                  <LinkSVG className="h-5 w-5 fill-current text-white" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Something went wrong</div>;
  }
}

export default UserComments;
