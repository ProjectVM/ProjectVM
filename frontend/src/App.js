import SignupForm from "./components/Signup/SignupForm";
import Login from "./components/login.jsx";
import UploadPage from "./components/Upload/upload";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
      <Router>
        <Route path='/signup' exact component={SignupForm} />
        <Route path='/' exact component={Login} />
        <Route path='/upload' exact component={UploadPage} />
      </Router>
  );
}

export default App;
