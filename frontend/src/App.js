import SignupForm from "./components/SignupForm";
import { Container, Row, Col, Button } from "reactstrap";
import Counter from "./components/counter";

function App() {
  return (
    <Container fluid="sm">
      <Counter />
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
