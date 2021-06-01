import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../helpers/axios";
import Comment from "./Comment";
import CommentPlaceholder from "./Resources/CommentPlaceholder";

function NestedComment({ commentID, depth = 1, numOfReplies}) {
  const query = useQuery(["comments","replies", commentID], () => {
    return axiosInstance
      .get(
        `/comments/replies?commentID=${commentID}&depth=${
          depth + 1
        }`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err.response));
  });

  let placeholder = new Array(numOfReplies).fill(0);


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
  } else if (query.isLoading) {
    return (
        <div>
          {placeholder.map((item, index) => {
            return <CommentPlaceholder/>
          })}
        </div>
      );
  }
  return <div></div>;
}

export default NestedComment;
