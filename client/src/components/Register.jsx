import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/signUp", {
        userName: username,
        email,
        password,
      });

      Navigate("/login");

      console.log(response.data);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="main">
      <div className="form_container">
        <form className="auth_form" onSubmit={registerUser}>
          <h2>Create Account / SignUp</h2>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="register_btn">
            Register
          </button>
        </form>

        <p className="para">Already have an account?</p>
        <Link to="/Login" className="login_btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
