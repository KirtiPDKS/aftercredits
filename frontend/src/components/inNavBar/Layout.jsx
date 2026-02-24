import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { useState, useEffect } from "react";

const Layout = () => {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(token !== null);

  // Listen for changes to localStorage from other tabs
  return (
    <>
      <NavigationBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <main className="container py-4">
        <Outlet context={{ setLoggedIn }} />
      </main>
    </>
  );
};

export default Layout;
