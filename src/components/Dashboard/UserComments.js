import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../helpers/axios";
import UserComment from "./UserComment";
import FullPageLoading from "../VideoPost/Resources/FullPageLoading";
function UserComments() {
  let [page, setPage] = useState(1);
  const query = useQuery(["ownComments", page], () => {
    return axiosInstance
      .get(`/comments/own?page=${page}`)
      .then((res) => res.data);
  });
  
  if (query.isSuccess) {
    if (query.data.message == "noComments")
      return (
        <div>
          <h1 className="pt-4 border-t-2 border-gray-700 text-2xl text-white font-bold sm:text-3xl">
            History
          </h1>
          <div className="rounded-md bg-cblue-500 my-5 h-40 w-full text-white w-full flex justify-center items-center text-xl font-bold">
            <h2></h2>You haven't Commented on anything yet !
          </div>
        </div>
      );
    return (
      <div>
        <h1 className="pt-4 border-t-2 border-gray-700 text-2xl text-white font-bold sm:text-3xl">
          History
        </h1>
        {query.data.map((item) => {
          return <UserComment item={item} key={`comments${item.comment_id}`} />;
        })}
        <PageChange page={page} setPage={setPage} data={query.data} />
      </div>
    );
  } else if (query.isLoading) {
    return (
        <div className="h-80 w-full"><FullPageLoading/></div>  
    );
  }
}

function PageChange({ page, setPage, data }) {
  //temporary solution for assuming les than 10 pages is the end of content
  return (
    <div className="my-4 w-full flex justify-center items-center text-white">
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

export default UserComments;
