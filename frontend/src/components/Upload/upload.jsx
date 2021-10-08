import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import "./upload.css";

function UploadPage() {
  function submit_confirm(event) {
    
  }

  function submit_cancel(event) {
    event.preventDefault();
  }

  return (
    <div className="background">
      <Sidebar />
      <div className="upload">
        <h1 className="title">Upload</h1>
        <div className="contentWrapper">
          <div className="selectMenu">
            
          </div>
          <div className="description">
          </div>
          <div className="buttons" >
            <Button name="Confirm" submitMethod={submit_confirm} />
            <Button name="Cancel"submitMethod={submit_cancel} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Button is only able to generate confirm and cancel buttons
function Button(props) {
  const buttonType = props.name=="Confirm" ? "confirm_button" : "cancel_button";

  return (
    <form onSubmit={props.submitMethod}>
      <input className="button" id={buttonType} type="submit" value={props.name} />
    </form>
  );
}

export default UploadPage;