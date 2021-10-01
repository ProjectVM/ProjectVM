import SignupForm from "./components/SignupForm";
import NavBar from "./components/NavBar";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  return (
    <Container fluid="sm">
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
