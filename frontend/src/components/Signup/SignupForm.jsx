import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Redirect } from "react-router";
import "./Signup.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");

  const submitUserData = () => {
    fetch(process.env.REACT_APP_API_PATH + "/register_user", {
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
        const message = data.MSG; // 200 for success and 400 for failure
        setMsg(message);
        console.log(data);
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
          <Warning
            msg={msg}
            username={username}
            textMsg="Incorrect account information, please try again."
          />
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
            type="password"
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

export function Warning(props) {
  if (props.msg) {
    if (props.msg == "200") {
      sessionStorage.setItem("username", props.username);
      return <Redirect to="/" />;
    } else if (props.msg == "400") {
      return (
        <p className="warning">
          {props.textMsg}
        </p>
      );
    } else {
      return <p>Can not recognize the number sent from server</p>;
    }
  } else {
    return <p />;
  }
}

export default SignupForm;
