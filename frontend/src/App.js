import SignupForm from "./components/Signup/SignupForm.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import Login from "./components/login.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Router>
        <Route path='/signup' exact component={SignupForm} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Homepage} />
      </Router>
  );
}

export default App;
