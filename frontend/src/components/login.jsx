import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Warning } from "./Signup/SignupForm.jsx";
import "./login.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function submitLoginData(event) {
    event.preventDefault();
    fetch("/login_user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const message = data.MSG; // 200 for success and 400 for failure
        setMsg(message);
        console.log(message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="background">
      <div className="mid_background">
        <h1 className="projectVM">ProjectVM</h1>
        <form className="loginWrapper" onSubmit={submitLoginData}>
          <Warning
            msg={msg}
            username={username}
            textMsg="Incorrect username or password" // Set the warning message here
          />
          <label>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <label>
            <input type="submit" value="LOGIN" id="submitButton" />
          </label>
        </form>
        <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}

export default LoginForm;
