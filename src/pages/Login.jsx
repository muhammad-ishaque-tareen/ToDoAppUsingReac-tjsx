import React, { useState } from "react";
import users from "../usersdata/users";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) =>
        (user.email === email || user.username === username) &&
        user.password === password
    );

    if (foundUser) {
      localStorage.setItem("LoggedInUser", JSON.stringify(foundUser));
      navigate("/dashboard");
    } else {
      setError("Invalid Email or Password.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          placeholder="Please Enter User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Please Enter a Valid Email."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Please Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-row">
          <button type="submit" className="left-btn">
            Login
          </button>
          <button
            type="button"
            className="right-btn"
            onClick={() => navigate("/forgetpassword")}
          >
            Forgot Password
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
