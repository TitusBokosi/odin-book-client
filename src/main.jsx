import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AddPost from "./components/addPost.jsx";
import { PostDetails } from "./components/PostDetails.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { LogIn } from "./components/auth/logIn.jsx";
import Profile from "./components/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/posts/add",
    element: <AddPost></AddPost>,
  },
  {
    path: "/posts/:postID",
    element: <PostDetails></PostDetails>,
  },
  {
    path: "/auth/login",
    element: <LogIn></LogIn>,
  },
  {
    path: "/posts/new",
    element: <AddPost></AddPost>,
  },
  {
    path: "/users/:userID",
    element: <Profile></Profile>,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      {" "}
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>
);
