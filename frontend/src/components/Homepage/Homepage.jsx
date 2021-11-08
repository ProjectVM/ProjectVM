import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx";
import "./Homepage.css";

function Homepage(){
  const [audioNameList, setAudioNameList] = useState(null);
  const [audioNameListIsLoaded, setAudioNameListIsLoaded] = useState(false);
  const [audioNameListError, setAudioNameListError] = useState("");

  useEffect(() => {
    
    fetch("/podcasts", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const infoList = data.info_list;

        if (!audioNameList) {
          setAudioNameList(infoList);
          setAudioNameListIsLoaded(true);
        }

      }, error => {
        setAudioNameListError(error);
        setAudioNameListIsLoaded(true);
      })
      .catch(error => console.log(error));
    
  }, );

  useEffect(() => {
    console.log(audioNameList);
  }, [audioNameList]);

    return (
        <div className="background">
          <Sidebar />
            <div className="homepage">
                <h1 className="title">Home</h1>
                <div className="contentWrapper">
                    <div className="heading">
                        <h1 className="genre">Genre</h1>
                        <h1 className="viewall">View all</h1>
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

function Podcasts(props) {
  if (props.error) {
    return <p>Error: {props.error}</p>;
  } else if (!props.isLoaded) {
    return <p>Loading...</p>;
  } else if (props.audioNameList) {

    const audioNameList = props.audioNameList;
    const usernameArray = Object.keys(props.audioNameList);
    const podcastList = [];
    console.log(audioNameList);
    console.log(usernameArray);

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
      <div className="podcastcontainer">
        {podcastList.map(namesArray => {
          const [fileName, audioName, username] = namesArray;
          return <SinglePodcast
                   fileName = {fileName}
                   audioName = {audioName}
                   username={username}
                 />;
        })}
      </div>
    );
  } else {
    return <p>No Podcasts</p>;
  }
}

function SinglePodcast(props) {
  const [picUrl, setPicUrl] = useState("");

  const fileName = props.fileName;
  const audioName = props.audioName;
  const username = props.username;

  const data = new FormData();
  data.append('fileName', fileName);

  useEffect(() => {
    
    fetch("/podcastUrl", {
        method: "POST",
        body: data,
    })
      .then((response) => response.json())
      .then((data) => {
          setPicUrl(data.picUrl);
      })
      .catch((error) => {
          console.error("Error", error);
      })
  })

  return (
    <div >
      <Link className="singlePodcast" to={{
        pathname: `podcast/${fileName}`,
        state: {
          fileName: `${fileName}`,
          audioName: `${audioName}`,
          username: `${username}`,
        }
      }}>
      <img className="coverPicPodcast" alt="Cover Picture" src={picUrl}/>
      <p>{audioName}</p>
      </Link>
    </div>
  );
}


export default Homepage;