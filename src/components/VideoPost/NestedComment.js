import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Comment from "./Comment";

function NestedComment({ commentID, depth = 1 }) {
  const query = useQuery(["comments","replies", commentID], () => {
    return axios
      .get(
        `http://localhost:3006/comments/replies?commentID=${commentID}&depth=${
          depth + 1
        }`,
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err.response));
  });

  if (query.isSuccess) {
    if (query.data) {
      return (
        <div>
          {query.data.map((item, index) => {
            return <Comment item={item} key={item.comment_id} nested={true} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  }
  return <div></div>;
}

export default NestedComment;
