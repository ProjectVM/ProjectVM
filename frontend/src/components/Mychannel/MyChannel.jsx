import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx";
import { SinglePodcast } from "../Homepage/Homepage.jsx";
import { TiDelete } from "react-icons/ti";
import "./MyChannel.css";

function MyChannel() {
  const [username, setUsername] = useState("");
  const [audioNameList, setAudioNameList] = useState(null);
  const [audioNameListIsLoaded, setAudioNameListIsLoaded] = useState(false);
  const [audioNameListError, setAudioNameListError] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    const name = sessionStorage.getItem("username");
    setUsername(name);
    console.log(name);

    const data = new FormData();
    data.append('username', name);

    
    fetch("/podcasts", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        const infoList = data.info_list;
        console.log(infoList);

        if (!audioNameList) {
          setAudioNameList(infoList);
          setAudioNameListIsLoaded(true);
        }

      }, error => {
        setAudioNameListError(error);
        setAudioNameListIsLoaded(true);
      })
      .catch(error => console.log(error));
    
  });

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
          <Podcasts_MyChannel
            error = {audioNameListError}
            isLoaded = {audioNameListIsLoaded}
            audioNameList = {audioNameList}
          />
        </div>
      </div>
    </div>
  );
}

function Podcasts_MyChannel(props) {
  if (props.error) {
    return <p>Error: {props.error}</p>;
  } else if (!props.isLoaded) {
    return <p>Loading...</p>;
  } else if (props.audioNameList) {

    const audioNameList = props.audioNameList;
    const usernameArray = Object.keys(props.audioNameList);
    const podcastList = [];

    // Construct a [fileName, audioName] list
    usernameArray.forEach(username => {
      const audioList = audioNameList[username];

      audioList.forEach(audioName => {
        if (audioName) {
          const fileName = username + "_" + audioName;
          const namesArray = [fileName, audioName, username];
          podcastList.push(namesArray);
        }

      });

    });

    return (
      <div className="podcastContainer">
        {podcastList.map(namesArray => {
          const [fileName, audioName, username] = namesArray;
          return (
            <div className="onePodcast">
              <SinglePodcast
                   key = {fileName}
                   fileName = {fileName}
                   audioName = {audioName}
                   username={username}
              />
              <TiDelete className="delete_button" />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p>No podcasts yet, upload one!</p>;
  }
}

export default MyChannel;