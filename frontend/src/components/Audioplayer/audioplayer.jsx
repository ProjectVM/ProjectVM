import React, { useState } from "react";
import "./audioplayer.css"
import Sidebar from "../Sidebar/sidebar.jsx";
import soundfile from "./Sample.mp3"
import pic from "./SamplePic.png"


function Podcast(props){
    //hardcord version
    const [podcastname, setPodcastname] = useState("Brooks");
    const [picFile, setPicFile] = useState(pic);
    const [description, setDescription] = useState("Classical piano music played by Kai Engel.");
    const [audioFile, setAudioFile] = useState(soundfile);
    const [category, setCategory] = useState("");
    const [comment, setComment] = useState("");


    function writeToComment(event) {
        const text = event.target.value;
        setComment(text);
        console.log(comment);
    }

    return (
        <div className="podcast_background">
            <Sidebar/>
            <div className="audioplayer">
                <h1 className="title_podcast">{podcastname}</h1>
                <div className="infor">
                    {/* hardcord version */}
                    <img className="coverPic_podcast" alt="Cover Picture" src={picFile ? picFile : ""}/>
                    {/* <image className="coverPic_podcast" alt="Cover Picture" src={picFile ? URL.createObjectURL(picFile) : ""}/> */}
                    <p1 className="description_podcast">Description: {description}</p1>
                </div>
                <AudioPlayer src={audioFile}/>
                <div className="commentWrapper_podcast">
                    <div className="comment_title">Comment:</div>
                    <textarea
                        className="textInput_podcast"
                        placeholder="Enter your comments here"
                        onChange={writeToComment}
                    />
                </div>

            </div>
        </div>
    )
}

function AudioPlayer(props) {
    const source = props.src==null ? "" : props.src;
    //hardcord version
    const urlObj = source=="" ? "" : source;
    // const urlObj = source=="" ? "" : URL.createObjectURL(source);
  
    return (
      <figure className="audioWrapper_podcast">
  
        <audio
          className="player"
          controls
          src={urlObj}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
    );
}

export default Podcast;