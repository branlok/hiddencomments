import React, { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3006/addUser", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        Promise.resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label>Username</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label>email</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label>password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input type="submit" value="submit"></input>
    </form>
  );
}

export default SignUp;
