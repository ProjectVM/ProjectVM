import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Signup.css";

function SignupForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="Background">
      <div className="Container">
        <div className="Contents">
          <h1 className="CreateAccount">Create Account</h1>
          <input className="Input" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username}></input>
          <input className="Input" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}></input>
          <input className="Input" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}></input>
          <button className="Start-button">Get started</button>
        </div>
      </div>
    </div>


    // <Form>
    //   <FormGroup>
    //     <Label for="exampleEmail">Email</Label>
    //     <Input
    //       type="email"
    //       name="email"
    //       id="exampleEmail"
    //       placeholder="with a placeholder"
    //       onChange={handleEmailInput}
    //     />
    //   </FormGroup>
    //   <FormGroup>
    //     <Label for="exampleUsername">Username</Label>
    //     <Input
    //       type="Username"
    //       name="Username"
    //       id="exampleUsername"
    //       placeholder="with a placeholder"
    //       onChange={handleUsernameInput}
    //     />
    //   </FormGroup>
    //   <FormGroup>
    //     <Label for="examplePassword">Password</Label>
    //     <Input
    //       type="password"
    //       name="password"
    //       id="examplePassword"
    //       placeholder="password placeholder"
    //       onChange={handlePasswordInput}
    //     />
    //   </FormGroup>
    //   <br />
    //   <Button color="primary">Submit</Button>
    // </Form>
  );
};

export default SignupForm;
