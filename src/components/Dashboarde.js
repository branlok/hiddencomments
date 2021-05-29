import React from "react";

function Dashboard() {
  const signout = async (e) => {
    await fetch("http://localhost:3006/signout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        Promise.resolve();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>

      <button onClick={(e) => signout(e)}>Logout</button>
    </div>
  );
}

export default Dashboard;
