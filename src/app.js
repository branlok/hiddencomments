import React, { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./Routes/Home";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
        <router path="/" exact>
            <Home/>
          </router>
          <router path="/signup" exact>
            <SignUp />
          </router>
          <router path="/signin" exact>
            <SignIn />
          </router>
          <router path="/dashboard" exact>
            <Dashboard />
          </router>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
