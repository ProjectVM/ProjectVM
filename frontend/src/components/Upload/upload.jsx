import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import "./upload.css";

function UploadPage() {
  const[picFile, setPicFile] = useState(null);
  const[audioFile, setAudioFile] = useState(null);
  const[category, setCategory] = useState("");
  const[description, setDescription] = useState("");
  const history = useHistory();

  function submit_confirm(event) {
    event.preventDefault();
  }

  function submit_cancel(event) {
    event.preventDefault();
    let path = "/";
    history.push(path);
  }

  function uploadPic(event) {
    const coverPic = event.target.files[0];
    setPicFile(coverPic);
    console.log(coverPic);
  }

  function uploadAudio(event) {
    const audio = event.target.files[0];
    setAudioFile(audio);
    console.log(audioFile);
  }

  function uploadCategory(event) {
    const text = event.target.value;
    function Capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    }
    setCategory(Capitalize(text));
    console.log(category);
  }

  function writeToDescription(event) {
    const text = event.target.value;
    setDescription(text);
    console.log(description);
  }

  return (
    <div className="background">

      <Sidebar />
      <div className="upload">

        <h1 className="title">Upload</h1>
        <div className="contentWrapper">

          <div className="selectMenu">
            <img className="coverPic" alt="Cover Picture" src={picFile ? URL.createObjectURL(picFile) : ""} />
            <div className="selectFromMenu">
              <UploadFile name="Cover Picture" file={picFile&&picFile.name ? picFile.name : null} method={uploadPic} />
              <UploadFile name="Audio File" file={audioFile&&audioFile.name ? audioFile.name : null} method={uploadAudio} />
              <ListCategories method={uploadCategory} />
            </div>
          </div>

          <AudioPlayer src={audioFile}/>

          <div className="description">
            <p className="subHeaderDes">Description:</p>
            <textarea
              className="textInput"
              placeholder="Add a description to what you share so that everybody learns more about your music"
              onChange={writeToDescription}
            />
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

// Only able to work with cover picture and audio file
function UploadFile(props) {
  const text = props.name + ":";
  const Id = props.name=="Cover Picture" ? "coverPicFile" : "audioFile";
  const labelText = props.file==null ? "Browse local files" : props.file;
  const acceptFileType = props.name=="Cover Picture" ? "image/*" : "audio/*";

  return (
    <div className="select">
      <p className="menuName">{text}</p>
      <label className="text_browser">{labelText}
        <input
          type="file"
          accept={acceptFileType}
          id={Id}
          onChange={props.method}
          className="browser" />
      </label>
    </div>
  );
}

function ListCategories(props) {

  return(
    <div className="select">
      <label className="menuName">Category:</label>
        <input
          list="categories"
          id="category"
          name="category"
          placeholder="Choose a category"
          onChange={props.method}
          className="textAndSelect" />
        <datalist id="categories">
          <option value="Focus" />
          <option value="Relax" />
        </datalist>
    </div>
  );
}

function AudioPlayer(props) {
  const source = props.src==null ? "" : props.src;
  const urlObj = source=="" ? "" : URL.createObjectURL(source);

  return (
    <figure className="audioWrapper">

      <audio
        className="audioPlayer"
        controls
        src={urlObj}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
  );
}

export default UploadPage;