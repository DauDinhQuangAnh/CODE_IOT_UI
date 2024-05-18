import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activate_tools from "./components/Activate_tools";
import Infor from "./components/Infor";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddDevice from "./components/AddDevice";
import AddSensor from "./components/AddSensor"; // Import AddSensor component
import Header from "./components/Header";
import './assets/css/App.css';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Activate_tools /> },
  { path: "/infor", element: <Infor /> },
  { path: "/signup", element: <Signup /> },
  { path: "/device", element: <AddDevice /> },
  { path: "/sensor", element: <AddSensor /> } // Thêm route cho AddSensor
]);

function App() {
  const username = localStorage.getItem("username");

  return (
    <>
      {username && <Header username={username} />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
