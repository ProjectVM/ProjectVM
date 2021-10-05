import React, { useState } from "react";
import "./login.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="background">
    <form className="loginWrapper">
      <h1 className="projectVM">ProjectVM</h1>
      <label>
            <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
            <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <label>
          <input type="submit" value="LOGIN" id="submitButton" />
      </label>
    </form>
    </div>
  );
};

export default LoginForm;