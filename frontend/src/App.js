import SignupForm from "./components/Signup/SignupForm";
import Login from "./components/login.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  const [state, setState] = useState({});

  return (
    <Router>
      <Route path="/signup" exact component={SignupForm} />
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
