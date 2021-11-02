import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import "./upload.css";

function UploadPage() {
  const[picFile, setPicFile] = useState(null);
  const[title, setTitle] = useState("");
  const[audioFile, setAudioFile] = useState(null);
  const[category, setCategory] = useState("");
  const[description, setDescription] = useState("");
  const history = useHistory();

  function submit_confirm(event) {
    event.preventDefault();
    const picExists = picFile ? true : false;
    const audioExists = audioFile ? true : false;
    const titleExists = title=="" ? false : true;
    const catExists = category=="" ? false : true;

    const picMsg = picExists ? "" : " {Cover Picture}";
    const audioMsg = audioExists ? "" : " {Audio File}";
    const titleMsg = titleExists ? "" : " {Title}";
    const catMsg = catExists ? "" : " {Category}";

    if (picExists&&audioExists&&titleExists&&catExists) {

      // form containing name, file, picture, description, and category
      const data = new FormData();

      data.append('title', title);
      data.append('audioFile', audioFile);
      data.append('picFile', picFile);
      data.append('description', description);
      data.append('category', category);

      fetch("/upload", {
        method: "POST",
        body: data,
      })
      // and redirect to My Channel

    } else {
      alert(`Please fill out the following field(s):\n${audioMsg}${titleMsg}${picMsg}${catMsg}.`);
    }
  }

  function submit_cancel(event) {
    event.preventDefault();
    let path = "/";
    history.push(path);
  }

  function writeToTitle(event) {
    const text = event.target.value;
    setTitle(text);
    console.log(title);
  }

  function picFileNameOrEmpty() {
    return picFile&&picFile.name ? picFile.name : "";
  }

  function uploadPic(event) {
    const coverPic = event.target.files[0];
    setPicFile(coverPic);
    console.log(coverPic);
  }

  function audioFileNameOrEmpty() {
    return audioFile&&audioFile.name ? audioFile.name : "";
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

        <h1 className="titleUpload">Upload</h1>
        <div className="contentWrapperUpload">

          <div className="selectMenu">
            <img className="coverPic" alt="Cover Picture" src={picFile ? URL.createObjectURL(picFile) : ""} />
            <div className="selectFromMenu">
              <UploadFile name="Audio File" file={audioFileNameOrEmpty()} method={uploadAudio} />
              <Title name={title} method={writeToTitle} />
              <UploadFile name="Cover Picture" file={picFileNameOrEmpty()} method={uploadPic} />
              <ListCategories name={category} method={uploadCategory} />
            </div>
          </div>

          <AudioPlayer src={audioFile}/>

          <div className="descriptionAudio">
            <p className="subHeaderDes">Description:</p>
            <textarea
              className="textInput"
              placeholder="Add a description to what you share so that everybody learns more about your product"
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


function Title(props) {

  return(
    <div className="select">
      <p className="requiredFieldIndicator">*</p>
      <p className="menuName">Title:</p>
      <label className="menuName" />
        <input
          id="audioTitle"
          name="audioTitle"
          value={props.name}
          placeholder="Enter a title for your audio"
          onChange={props.method}
          className="textAndSelect" />
    </div>
  );
}

// Only able to work with cover picture and audio file
function UploadFile(props) {
  const text = props.name + ":";
  const Id = props.name=="Cover Picture" ? "coverPicFile" : "audioFile";
  const labelText = props.file=="" ? "Browse local files" : props.file;
  const acceptFileType = props.name=="Cover Picture" ? "image/*" : "audio/*";

  return (
    <div className="select">
      <p className="requiredFieldIndicator">*</p>
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
      <p className="requiredFieldIndicator">*</p>
      <p className="menuName">Category:</p>
      <label className="menuName" />
        <input
          list="categories"
          id="category"
          name="category"
          value={props.name}
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