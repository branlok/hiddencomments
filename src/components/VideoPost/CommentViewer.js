import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

function CommentViewer({ videoId }) {
  let query = useQuery(["comments", "videoID"], () => {
    return axios
      .get(`http://localhost:3006/comments?v=${videoId}&page=1`, {
        withCredentials: true,
      })
      .then((res) => res.data);
  });

  if (query.isSuccess) {
    console.log(query.data);
    return (
      <div className="my-4 w-full lg:w-1/2 m-auto flex items-center flex-col">
        {query.data.map((item, index) => {
          return (
            <div
              className="h-24 w-full bg-cblue-300 p-4 my-2 rounded-md"
              key={item.comment_id}
            >
              <h1 className="font-bold text-white">{item.username}</h1> <br/>
              <p className="text-white">{item.body}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div className="max-h-3/4"></div>;
  }
}

export default CommentViewer;
