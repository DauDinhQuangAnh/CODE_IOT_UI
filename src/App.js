import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activate_tools from "./components/Activate_tools";
import Infor from "./components/Infor";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Import trang đăng ký
import './assets/css/App.css';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Activate_tools /> },
  { path: "/infor", element: <Infor /> },
  { path: "/signup", element: <Signup /> }, // Thêm route cho trang đăng ký
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
