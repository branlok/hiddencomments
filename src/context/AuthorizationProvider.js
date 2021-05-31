import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const AuthorizationContext = createContext();

const initialState = {
  authorized: localStorage.getItem("authorized") ? true : false,
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : false,
  uid: localStorage.getItem("id") ? localStorage.getItem("id") : false,
};

export function useAuthorization() {
  const context = useContext(AuthorizationContext);
  const [authState, dispatch] = context;

  const login = (user) => {
    //we are authorized, save a copy in the localStorage
    localStorage.setItem("authorized", Date.now());
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.uid);
    console.log("do i even run lol");
    dispatch({ type: "authorized", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("authorized");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    dispatch({ type: "unauthorized" });
  };

  return {
    authState,
    login,
    logout,
  };
}

function authReducer(state, action) {
  console.log({ ...state, authorized: true, ...action.payload }, "re");
  switch (action.type) {
    case "authorized":
      return { ...state, authorized: true, ...action.payload };
    case "unauthorized":
      return { authorized: false };
    default:
      return state;
  }
}

//we use this to wrap section of the app that require access to these states.
function AuthorizationProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = [state, dispatch]; //reminder, this memo doesnt actually help since its at the top level.
  console.log(state, "readmeeee");
  return <AuthorizationContext.Provider value={value} {...props} />;
}

export default AuthorizationProvider;
