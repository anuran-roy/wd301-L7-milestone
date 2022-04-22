import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import { User } from "./types/userTypes";
import { me } from "./utils/apiUtils";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  try {
    const currentUser: User = await me();
    // return currentUser;
    setCurrentUser(currentUser);
  } catch (err) {
    console.error(err);
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, [])

  console.log("From app.tsx")
  console.log(currentUser);

  return (
    <AppRouter currentUser={currentUser} />
  );
}

export default App;
