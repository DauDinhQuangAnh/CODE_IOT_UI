import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Activate_tools from "./components/Activate_tools";
import Infor from "./components/Infor";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddDevice from "./components/AddDevice";
import AddSensor from "./components/AddSensor"; 
import Header from "./components/Header";
import './assets/css/App.css';

function AppContent() {
  const location = useLocation();
  const username = localStorage.getItem("username");

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/signup" && username && <Header username={username} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Activate_tools />} />
        <Route path="/infor" element={<Infor />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/device" element={<AddDevice />} />
        <Route path="/sensor" element={<AddSensor />} /> {}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
