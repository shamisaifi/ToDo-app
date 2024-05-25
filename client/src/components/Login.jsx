import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../util";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      // console.log(response.data);

      setAccessToken(response.data.token);

      if (email !== response.data.user.email) {
        console.log(" user not found");
        alert("user not found! create account ");
        return;
      }

      if (response.data.message === "success") {
        Navigate("/home");
      } else {
        console.log("wrong password ");
        alert("wrong password");
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="main">
      <div className="form_container">
        <form className="auth_form" onSubmit={handleLogin}>
          <h2>Login</h2>
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
          <button type="submit" className="login_btn">
            login
          </button>
        </form>
        <div className="signup_link">
          <p>dont have an account? create one</p>
          <Link to="/" className="signup_btn">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
