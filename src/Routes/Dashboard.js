import React from "react";
import DashboardInterface from "../components/Dashboard";
import Nav from "../components/Dashboard/Nav";

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
