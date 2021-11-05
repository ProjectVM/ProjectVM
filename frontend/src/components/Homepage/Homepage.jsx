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
          const namesArray = [fileName, audioName];
          podcastList.push(namesArray);
        }

      });

    });

    return (
      <div className="podcastcontainer">
        {podcastList.map(namesArray => {
          const [fileName, audioName] = namesArray;
          return <SinglePodcast fileName = {fileName} audioName = {audioName} />;
        })}
        
      </div>
    );
  } else {
    return <p>No Podcasts</p>;
  }
}

function SinglePodcast(props) {
  const fileName = props.fileName;
  const s3_url = "https://cse442-projectvm.s3.amazonaws.com/podcast_image/" + fileName + ".png";
  console.log(s3_url);

  return (
    <div className="singlePodcast">
      <img className="coverPicPodcast" alt="Cover Picture" src={s3_url}/>
      <p>{props.audioName}</p>
    </div>
  );
}

export default Homepage;