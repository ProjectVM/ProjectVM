import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx";
import { Podcasts, SinglePodcast } from "../Homepage/Homepage.jsx";
import "./MyChannel.css";

function MyChannel() {
  const [audioNameList, setAudioNameList] = useState(null);
  const [audioNameListIsLoaded, setAudioNameListIsLoaded] = useState(false);
  const [audioNameListError, setAudioNameListError] = useState("");
  const history = useHistory();

  function uploadButtonClicked() {
    let path = "/upload";
    history.push(path);
  }

  return (
    <div className="background">
      <Sidebar />
      <div className="myChannel">
        <h1 className="title_myChannel">My Channel</h1>
        <div className="contentWrapper">
          <div className="heading">
            <h1 className="playlist">Playlist</h1>
            <button
              className="uploadButtonMyChannel"
              onClick={uploadButtonClicked}
            >
              Upload
            </button>
          </div>
          <Podcasts
            error = {audioNameListError}
            isLoaded = {audioNameListIsLoaded}
            audioNameList = {audioNameList}
          />
        </div>
      </div>
    </div>
  );
}

export default MyChannel;