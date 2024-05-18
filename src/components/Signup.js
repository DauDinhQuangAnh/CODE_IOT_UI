import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Signup.css";

export default function Signup({ onLoginClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup(ev) {
    ev.preventDefault();

    // Xác thực đầu vào
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        password,
      });

      if (response.status === 201) {
        alert("Registration successful");
        navigate("/");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("User already exists or registration failed");
    }
  }

  return (
    <div className="main">
      <form className="login" onSubmit={signup}>
        <h1 className="login-title">Sign up</h1>
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
        <button className="button" type="submit">
          Sign up
        </button>
        <div>
          <p>
            Already have an account?{" "}
            <span>
              <a className="register-redirect" onClick={onLoginClick}>
                Login
              </a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
