import React from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useQuery } from "react-query";
import axios from "axios";
import CommentMaker from "../components/VideoPost/CommentMaker";
import CommentViewer from "../components/VideoPost/CommentViewer";

function Watch() {
  let location = useLocation();
  let parsed = queryString.parse(location.search).v;

  let query = useQuery("existsInDB", () => {
    return axios
      .get(`http://localhost:3006/watch?v=${parsed}`, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.response);
      });
  });

  console.log(queryString.parse(location.search).v);

  if (query.isSuccess) {
    return (
      //TOPIC
      <div className="bg-cblue-400 h-auto w-full flex justify-center items-center flex-col">
        <section className="my-4 w-full lg:w-1/2 m-auto flex items-center flex-col">
          <h1 className="text-xl font-bold text-white my-2">
            {query.data.title}
          </h1>
          <img src={query.data.thumbnail} />
          <CommentMaker  videoId={parsed}/>
        </section>
        <section className="bg-cblue-500 w-full h-full my-4">
            <CommentViewer  videoId={parsed}/>
        </section>
      </div>
    );
  } else {
    return <div>nah</div>;
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
