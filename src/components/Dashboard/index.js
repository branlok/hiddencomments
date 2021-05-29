import axios from "axios";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { useAuthorization } from "../../context/AuthorizationProvider";

function DashboardInterface() {
  const { authState, logout } = useAuthorization();

  const mutation = useMutation(
    () => {
      return axios
        .get("http://localhost:3006/authentication/signout")
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
  return (
    <div className="h-full w-full flex-initial p-5">
      <h1 className="text-white text-5xl font-bold">Hello , username</h1>
      <div>
        <h1>History</h1>
        <div>//body</div>
      </div>
      {authState.authorized.toString()};
      <button onClick={() => mutation.mutate()}>singout</button>
    </div>
  );
}

export default DashboardInterface;
