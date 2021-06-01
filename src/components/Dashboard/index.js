
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuthorization } from "../../context/AuthorizationProvider";
import axiosInstance from "../../helpers/axios";
import UserComments from "./UserComments";

function DashboardInterface() {
  const { authState, logout } = useAuthorization();

  const mutation = useMutation(
    () => {
      return axiosInstance
        .get("/authentication/signout")
        .then((response) => {
          console.log(response.data);
        });
    },
    {
      onSuccess: () => {
        logout();
      },
      onSettled: () => {
        console.log(authState);
      },
    }
  );
  let history = useHistory();

  if (!authState.authorized) history.push("/");
  if (authState.authorized && authState.username) {
    return (
      <div className="h-full w-full flex-initial p-5">
        <h1 className="text-white text-5xl font-bold">
          Hello, {authState.username}
        </h1>
        <div className="my-2">
          <button
            className="text-red-500 font-bold border-2 border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
            onClick={() => mutation.mutate()}
          >
            Sign out
          </button>
        </div>
        <UserComments />
      </div>
    );
  } else {
    return (
      <div className="bg-cblue-400 h-full w-full flex justify-center items-center flex-col text-white">
        <h1 className="text-xl font-bold">
          {" "}
          We only accept videos with comments disabled
        </h1>
        <p>
          Return to
          <Link to="/" className="text-gray-200">
            <span className="text-blue-500">Home</span>
          </Link>
        </p>
      </div>
    );
  }
}

export default DashboardInterface;
