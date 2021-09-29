import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
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
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="password placeholder"
          onChange={handlePasswordInput}
        />
      </FormGroup>
    </Form>
  );
};

export default SignupForm;
