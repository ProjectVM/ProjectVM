import SignupForm from "./components/SignupForm";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  return (
    <Container fluid="sm">
      <Row xs="3">
        <Col>
          <SignupForm />
          <br />
          <Button color="primary">Submit</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
