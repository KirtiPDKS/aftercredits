import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./components/inNavBar/Layout";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";

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
    path: "/movies/:id",
    element: <MovieDetailsPage />,
  },
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
