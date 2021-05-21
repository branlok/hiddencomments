import React, { useState } from "react";
import { useMutation } from "react-query";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation(() => {
    return fetch("http://localhost:3006/signin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      return response.json();
    });
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <label>Email</label>
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

export default SignIn;
