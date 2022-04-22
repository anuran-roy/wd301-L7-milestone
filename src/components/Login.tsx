import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import { login } from "../utils/apiUtils";
import AppContainer from "./AppContainer";
import Header from "./Header";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginCB = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(username, password);

    try {
      console.log("From login.tsx: " + username + " " + password);
      const response = await login(username, password);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <Header title="Login" /> */}
      <form className="justify-items-center">
        <div className="my-3 flex">
          <label className="my-2 p-2" htmlFor="usernameInput">
            Username:{" "}
          </label>
          <input
            id="usernameInput"
            type="text"
            className="my-2 h-14 w-48 flex-auto items-center border-0 p-2 text-center text-lg hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
        <div className="my-3 flex">
          <label className="my-2 p-2" htmlFor="passwordInput">
            Password:{" "}
          </label>
          <input
            id="passwordInput"
            type="password"
            className="my-2 h-14 w-14 flex-1 items-center border-0 p-2 text-center text-lg hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="my-3 flex content-center justify-items-center">
          <button
            className="btn m-2 rounded-md bg-sky-500 px-5 py-2 font-bold text-white"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => loginCB(e)}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
