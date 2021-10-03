import React, { Component, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class NavBar extends Component {
  states = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              ProjectVM
            </a>
          </div>
        </nav>

        {/* <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Navbar</span>
          </div>
        </nav> */}
      </React.Fragment>
    );
  }
}

export default NavBar;
