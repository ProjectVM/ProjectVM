import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Signup.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submitUserData = () => {
    fetch("/register_user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Background">
      <div className="Container">
        <div className="Contents">
          <h1 className="CreateAccount">Create Account</h1>
          <input
            className="Input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <input
            className="Input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <input
            className="Input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="Start-button" onClick={submitUserData}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
