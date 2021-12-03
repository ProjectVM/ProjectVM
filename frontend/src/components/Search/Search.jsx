import React, { useState, useEffect } from "react";
import { FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx";
import "./Search.css";

function Search(){
    const [search, setSearch] = useState("");
    const [user, setUsername] = useState("");

    const [audioNameList, setAudioNameList] = useState(null);
    const [audioNameListIsLoaded, setAudioNameListIsLoaded] = useState(false);
    const [clikercheck, setClicker] = useState(false);

    useEffect(() => {
        if (clikercheck){
        if (search != ""){
            const data = new FormData();
            data.append('username', search); // search term is a username

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
                        setUsername(search);
                    }

                }, error => {        
                    alert("Wrong username");
                })
                .catch(error => console.log(error));
        }
        else{
            alert("Please type any username");
        }
        }
    }, [user, audioNameListIsLoaded, audioNameList, clikercheck])

    const search_user = () => {
        setUsername("");
        setAudioNameList(null);
        setClicker(true);
    };

    return (
        <div className="background_search">
          <Sidebar />
            <div className="search">
                <div className="search_placeholder">
                    <h1 className="title_search">Search</h1>
                    <div className="holder">
                        <input
                            className="Input_search"
                            placeholder=""
                            onChange={(e) => setSearch(e.target.value)}
                            value={search} ></input>
                        <FaSearch className="icon" onClick={search_user}/>
                    </div>

                </div>
                <div className="contentWrapper_search">
                    <div className="username">
                        {user}
                    </div>
                    <Podcasts
                        isLoaded = {audioNameListIsLoaded}
                        audioNameList = {audioNameList}
                    />
                </div>
            </div>
        </div>
    );
}

export function Podcasts(props) {
    if (props.audioNameList) {
  
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
        <div className="podcastcontainer_search">
          {podcastList.map(namesArray => {
            const [fileName, audioName, username] = namesArray;
            return <SinglePodcast
                     key = {fileName}
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

export function SinglePodcast(props) {
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
        });
    });
  
    return (
      <div >
        <Link className="singlePodcast_search" to={{
          pathname: `podcast/${fileName}`,
          state: {
            fileName: `${fileName}`,
            audioName: `${audioName}`,
            username: `${username}`,
          }
        }}>
        <img className="coverPicPodcast_search" alt="Cover Picture" src={picUrl}/>
        <p className="podcastName_search">{audioName}</p>
        </Link>
      </div>
    );
}

export default Search;