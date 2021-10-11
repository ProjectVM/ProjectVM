import SignupForm from "./components/Signup/SignupForm.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import Login from "./components/login.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  const [state, setState] = useState({});

  return (
      <Router>
        <Route path='/signup' exact component={SignupForm} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Homepage} />
      </Router>
  );
}

export default App;
