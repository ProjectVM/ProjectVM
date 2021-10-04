import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");

  const handleEmailInput = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleUsernameInput = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const submitUserData = () => {
    fetch("/api/register_user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        Username,
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
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="with a placeholder"
          onChange={handleEmailInput}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          type="Username"
          name="Username"
          id="exampleUsername"
          placeholder="with a placeholder"
          onChange={handleUsernameInput}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password placeholder"
          onChange={handlePasswordInput}
        />
      </FormGroup>
      <br />
      <Button color="primary" onClick={submitUserData}>
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
