import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import SignIn from "./components/SignIn";
import AuthorizationProvider, {
  useAuthorization,
} from "./context/AuthorizationProvider";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import SingUp from "./Routes/SignUp";
import Watch from "./Routes/Watch";
axios.defaults.withCredentials = true;
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <AuthorizationProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="h-full w-full ">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/dashboard" exact>
                <Dashboard />
              </Route>
              <Route path="/watch" exact>
                <Watch />
              </Route>
            </Switch>
          </div>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AuthorizationProvider>
  );
};

export default App;
