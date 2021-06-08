import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { useAuthorization } from "../../context/AuthorizationProvider";
import axiosInstance from "../../helpers/axios";

function useLogout() {
  const { authState, logout } = useAuthorization();
  
  const mutation = useMutation(
    () => {
      return axiosInstance.get("/authentication/signout").then((response) => {
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

  return mutation;
}

export default useLogout;
