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
import AuthorizationProvider, {
  useAuthorization,
} from "./context/AuthorizationProvider";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import Watch from "./Routes/Watch";
import Information from "./components/Information";
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
          <div className="scrollWindow relative h-full w-full overflow-x-hidden ">
            <Information/>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthorizationProvider>
  );
};

export default App;
