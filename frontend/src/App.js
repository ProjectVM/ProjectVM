import SignupForm from "./components/Signup/SignupForm.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import Aboutme from "./components/Aboutme/Aboutme.jsx";
import Podcast from "./components/Audioplayer/audioplayer.jsx";
import Login from "./components/login.jsx";
import Upload from "./components/Upload/upload.jsx";
import Audiotest from "./components/Audiotest/Audiotest.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

function App() {
  const [state, setState] = useState({});
  return (
    <Router>
      <Route path="/signup" exact component={SignupForm} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Homepage} />
      <Route path="/testing" exact component={Audiotest} />
      <Route path="/about" exact component={Aboutme} />
      <Route path="/podcast" exact component={Podcast} />
      <Route path="/upload" exact component={Upload} />
    </Router>
  );
}

export default App;
