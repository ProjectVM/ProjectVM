import SignupForm from "./components/SignupForm";
import Login from "./components/login.jsx";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.status === 200) {
          return response.json;
        }
      })
      .then((data) => console.log(data))
      .then((error) => console.log(error));
  });

  return (
    <Container className="App" fluid="sm">
      <NavBar />
      <Row xs="3">
        <Col>
          <SignupForm />
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
