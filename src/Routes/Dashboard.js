import React, { useEffect } from "react";
import { useLocation } from "react-router";

import DashboardInterface from "../components/Dashboard";

function Dashboard() {

  return (
    <div
      className="bg-cblue-400 h-auto w-full flex 
      flex-col"
    >
      <DashboardInterface />
    </div>
  );
}

export default Dashboard;
