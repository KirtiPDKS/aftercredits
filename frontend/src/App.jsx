import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./components/inNavBar/Layout";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { BrowsingPage } from "./pages/Browsing/BrowsingPage"
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import AllUsersPage from "./pages/Users/AllUsersPage";
import { GenericProfilePage } from "./pages/Users/GenericProfilePage";
import { YourProfilePage } from "./pages/Users/YourProfilePage";

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
  {
    path: "/movies",
    element: <FeedPage />,
  },
  {
    path: "/browse",
    element: <BrowsingPage />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetailsPage />,
  },
  {
    path:"/users/all",
    element:<AllUsersPage/>
  },
  {
    path:"/users/:username",
    element:<GenericProfilePage/>
  },
  {
    path:"/users/myprofile",
    element:<YourProfilePage/>
  }
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
