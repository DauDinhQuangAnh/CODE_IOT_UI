import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Login.css";
import Signup from "./Signup";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("username", username); // Lưu tên người dùng vào localStorage
        setRedirect(true);
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="main">
      
      {showLogin ? (
        <form className="login" onSubmit={login}>
          <h1 className="login-title">Login In To The System</h1>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button style={{fontSize:"20px"}} className="button" type="submit">
            Login
          </button>
          <p style={{fontWeight:"bold", color:"white", fontSize:"30px"}}>
            No account?{" "}
            <span>
              <a style={{fontWeight:"bold", color:"white", fontSize:"30px", textDecoration:"underline"}} className="register-redirect" onClick={handleSignupClick}>
                Register
              </a>
            </span>
          </p>
        </form>
      ) : (
        <Signup onLoginClick={handleLoginClick} />
      )}
    </div>
  );
}
