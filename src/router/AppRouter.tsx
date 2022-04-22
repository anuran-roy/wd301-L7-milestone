import { useRoutes } from "raviger";
import React, { useState } from "react";
import Header from "../components/Header";
import About from "../components/About";
import App from "../App";
import Form from "../components/Form";
import Preview from "../components/Preview";
import CustomModal from "../components/common/CustomModal";
import CreateForm from "../components/CreateForm";
import Login from "../components/Login";
import AppContainer from "../components/AppContainer";
import { User } from "../types/userTypes";
const Home = React.lazy(() => import("../components/Home"));

export default function AppRouter(props: {
  currentUser: User;
}) {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  const routes = {
    "/login": () => <Login />,
    "/": () => <React.Suspense fallback={<div>Loading...</div>}><Home /></React.Suspense>, // <Header title="Hello World!" />,
    "/about": () => <React.Suspense fallback={<div>Loading...</div>}><About /></React.Suspense>,
    "/create_form": () => <CreateForm />,
    "/form/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <React.Suspense fallback={<div>Loading...</div>}><Preview formId={Number(id)} /></React.Suspense>,
    "/custom_modal": () => <CustomModal />
  };

  const routeResult = useRoutes(routes);
  return <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>;
}
