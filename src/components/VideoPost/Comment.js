import React, { useState } from "react";
import { DateTime } from "luxon";
import { ReactComponent as ReplySVG } from "../../styles/back-reply-svgrepo-com (1).svg";
import { ReactComponent as DeleteSVG } from "../../styles/close-svgrepo-com (4).svg";
import { ReactComponent as GarbageSVG } from "../../styles/garbage-trash-svgrepo-com.svg";
import ReplyComment from "./ReplyComment";
import TimeAgo from "react-timeago";
import { useAuthorization } from "../../context/AuthorizationProvider";
import NestedComment from "./NestedComment";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import axiosInstance from "../../helpers/axios";
function Comment({ item, nested }) {
  const [replyComment, setReplyComment] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      return axiosInstance
        .delete(`/comments?commentID=${item.comment_id}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );
  let { authState } = useAuthorization();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!replyComment && item.num_of_replies > 0) {
          setReplyComment((prevState) => !prevState);
        }
      }}
      className={`${confirmDelete && "py-10"} ${
        nested && !replyComment && "hover:bg-gray-700"
      } 
      ${nested ? "hover:border-gray-400" : "hover:border-gray-700"}
      transition-all overflow-hidden relative min-h-24 w-full bg-cblue-300 px-4 py-4  my-2 rounded-md flex flex-col border-2 border-gray-500  transition`}
    >
      <div className="w-full flex items-center">
        <h1 className="font-bold text-white">{item.username}</h1>
        <TimeAgo
          className="mx-2 text-xs text-gray-400"
          date={DateTime.fromISO(item.created_on).toLocal().toJSDate()}
          minPeriod="30"
        />
      </div>
      {confirmDelete && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full h-full flex flex-col justify-center items-center z-10 bg-cblue-300 text-white absolute top-0 left-0  "
        >
          <p className="font-bold text-lg my-2">Confirm to Delete</p>
          <div className="">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-1 py-0.5 mx-2 focus:outline-none "
            >
              back
            </button>
            <button
              onClick={() => mutation.mutate()}
              className="px-1 py-0.5 rounded-md border-2 text-red-500 border-red-500 mx-2  hover:bg-red-500 hover:text-white focus:outline-none transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {item.user_id == authState.uid && (
        <button className="absolute top-2 right-2 h-3 w-3">
          <DeleteSVG
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDelete(true);
            }}
            className="fill-current text-gray-200 hover:text-red-500 transition"
          />
        </button>
      )}
      <p className="text-white text-gray-300">{item.body}</p>
      {replyComment ? (
        <>
          <NestedComment commentID={item.comment_id} depth={item.depth} numOfReplies={item.num_of_replies}/>

          <ReplyComment
            replyTo={item.comment_id}
            videoId={item.video_id}
            setReplyComment={setReplyComment}
          />
          {true && (
            <div className=" w-full text-right font-bold mt-2 border-t-2 border-gray-800">
              <button
                className="text-xs font-bold text-gray-200 hover:animate-pulse mx-2 focus:outline-none "
                onClick={() => setReplyComment(false)}
              >
                Collapse
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <button
            className="absolute bottom-2 right-2 flex items-center focus:outline-none  "
            onClick={(e) => {
              e.stopPropagation();
              setReplyComment((prevState) => !prevState);
            }}
          >
            <span className="mx-1 text-xs text-white">
              {item.num_of_replies}
            </span>
            <ReplySVG className="fill-current text-gray-300 hover:text-white transition h-3 w-3  " />
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
