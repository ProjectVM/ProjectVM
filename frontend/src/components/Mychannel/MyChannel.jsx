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
  
  // Load the audio list from database
  useEffect(() => {
    const name = sessionStorage.getItem("username");
    setUsername(name);

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

  // The upload button directs users to the Upload page
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
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    if (props.audioNameList) {
      constructList(props.audioNameList);
    }
  });

  // Construct a [fileName, audioName, username] list
  function constructList(audioList) {
    const audioNameList = props.audioNameList;
    const usernameArray = Object.keys(props.audioNameList);
    usernameArray.forEach(username => {
      const audioList = audioNameList[username];

      audioList.forEach(audioName => {
        if (audioName) {
          const fileName = username + "_" + audioName;
          const namesArray = Array.of(fileName, audioName, username);
          const newList = podcastList;

          if (!isIncludedIn(newList, namesArray)) {
            newList.push(namesArray);
            setPodcastList(newList);
          }

        }
      });
    });
  }

  // Return true if the audio file already existed, false otherwise.
  function isIncludedIn(array, names) {
    if (array) {
      const [fileName] = names;
      var bool = false;
      for (let namesArray of array) {
        const [anotherFileName] = namesArray;
        if (anotherFileName == fileName) {
          bool = true;
        }
      }
      return bool;

    } else {
      return false;
    }
  }

  if (props.error) {
    return <p>Error: {props.error}</p>;
  } else if (!props.isLoaded) {
    return <p>Loading...</p>;
  } else if (props.audioNameList) {
    
    // Remove the audio from both the database and the list stored in front end
    function deletePodcast (fileName, username, audioName) {
      const data = new FormData();

      data.append('username', username);
      data.append('podcast_name', audioName);
      var newList = podcastList;
      newList = deleteFrom(newList, fileName);
      setPodcastList(newList);

      fetch("/delete_pod", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          const status = data.status;
          console.log(data);
          if (status == 200) {
            var newList = podcastList;
            newList = deleteFrom(newList, fileName);
            setPodcastList(newList);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Remove the audio from the list stored in front end
    function deleteFrom(array, filename) {
      if (array) {
        return array.filter(names => {
          const [fileName] = names;
          return fileName != filename;
        });
      } else {
        return [];
      }
    }

    return (
      <div className="podcastContainer">
        {podcastList.map(namesArray => {
          const [fileName, audioName, username] = namesArray;
          return (
            <div key={`${fileName}_podcast`} className="onePodcast">
              <SinglePodcast
                   key={`${fileName}_cover`}
                   fileName={fileName}
                   audioName={audioName}
                   username={username}
              />
              <TiDelete
                key={`${fileName}_delete`}
                className="delete_button"
                onClick={() => deletePodcast(fileName, username, audioName)}
              />
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