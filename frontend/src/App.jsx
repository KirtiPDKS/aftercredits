import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./components/inNavBar/Layout";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Users/ProfilePage";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  { element: <Layout/>,
  children:[
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  // {
  //   path: "/movies",
  //   element: <FeedPage />,
  // },
  // {
  //   path:"/users/:username",
  //   element: <ProfilePage/> 
  // }
  ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
