
import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../helpers/axios";
import Comment from "./Comment";

function CommentViewer({ videoId }) {
  const [page, setPage] = useState(1);
  const [showReply, setShowReply] = useState();

  let query = useQuery(["comments", page, videoId], () => {
    return axiosInstance
      .get(`/comments?v=${videoId}&page=${page}`)
      .then((res) => res.data);
  });

  if (query.isSuccess) {
    return (
      <div className="px-2 sm:px-0 my-4 w-full lg:w-1/2 m-auto flex items-center flex-col">
        <h1 className="text-2xl font-bold text-white my-4"> Discussion</h1>
        {query.data.length == 0 && <div className="text-white font-bold text-gray-200">Currently there is no discussion</div>}
        {query.data.map((item, index) => {
          return <Comment item={item} key={item.comment_id} />;
        })}
        <PageChange page={page} setPage={setPage} data={query.data} />
      </div>
    );
  } else {
    return <div className="max-h-3/4"></div>;
  }
}

function PageChange({ page, setPage, data }) {
  //temporary solution for assuming les than 10 pages is the end of content
  return (
    <div className="w-full flex justify-center items-center text-white">
      {page != 1 && (
        <button
          className="px-2"
          onClick={() => setPage((prevState) => Math.max(prevState - 1, 1))}
        >
          Previous
        </button>
      )}
      {data.length < 10 ? null : (
        <button
          className="px-2"
          onClick={() => setPage((prevState) => prevState + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default CommentViewer;
