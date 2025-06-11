import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/User/Register.jsx";
import Login from "./components/User/Login.jsx";
import Home from "./components/Home/Home.jsx";
import User from "./components/User/User.jsx";
import Profile from "./components/User/Profile/Profile.jsx";
import Matches from "./components/User/Matches/Matches.jsx";
import ProfileUpdate from "./components/User/ProfileUpdate/ProfileUpdate.jsx"
import ViewProfile from "./components/utils/ViewProfile/ViewProfile.jsx";
import Swipe from "./components/Swipe/Swipe.jsx";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: "/user/register",
            element: <Register />,
          },
          {
            path: "/user/login",
            element: <Login />,
          },
          {
            path: "/user/profile",
            element: <Profile />,
          },
          {
            path: "/user/profile-update",
            element: <ProfileUpdate />,
          },
          {
            path: "/user/matches",
            element: <Matches />,
          }
        ]
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/swipe",
        element: <Swipe />
      },
      {
        path: "/:username",
        element: <ViewProfile />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
