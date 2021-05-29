import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

function SignUpPrompt() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const mutation = useMutation(() => {
    return axios
      .post("http://localhost:3006/addUser", {
        email,
        username,
        password,
      })
      .then((response) => {
        console.log(response, "1");
        return response;
      })
      .catch((err) => {
        console.log(err.response.data, "2");
        // return err;
      });
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (mutation.isError) {

    return <div>bruh</div>
  }

  if (mutation.isSuccess) {
    return (
      <div className="w-60 h-60 flex justify-center flex-col items-center border border-black rounded-md bg-gray-200">
        Success! Login here
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="w-60 h-60 flex justify-center flex-col items-center border border-black rounded-md bg-gray-200"
    >
      <h1>Sign Up</h1>
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
      <input
        className="px-2 py-1 border m-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 cursor-pointer"
        type="submit"
        value="submit"
      ></input>
    </form>
  );
}

export default SignUpPrompt;
