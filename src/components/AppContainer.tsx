import React, { useEffect } from "react";
import { User } from "../types/userTypes";
import Header from "./Header";
// import logo from "../logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppContainer(props: {
  currentUser: User;
  children: React.ReactNode;
}) {
  console.log("CurrentUser at AppContainer = ");
  console.table(props.currentUser);
  console.table(props.currentUser !== null);

  useEffect(() => {
    toast("Page loaded!");
  }, [])
  return (<>
    <ToastContainer />
    <div className="flex min-h-screen items-center overflow-auto bg-gray-100">
      <div className="m-4 mx-auto w-full max-w-6xl rounded-xl bg-white p-4 shadow-lg">
        <Header title={"Typeform project"} currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
    </>
  );
}
