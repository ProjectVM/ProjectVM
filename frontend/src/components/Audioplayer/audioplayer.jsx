import React, { useState, useEffect } from "react";
import "./audioplayer.css"
import Sidebar from "../Sidebar/sidebar.jsx";


function Podcast(props){
    const [podcastname, setPodcastname] = useState("");
    const [username, setUsername] = useState("");
    const [picUrl, setPicUrl] = useState("");
    const [description, setDescription] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [category, setCategory] = useState("");
    const [comment, setComment] = useState("");


    function writeToComment(event) {
        const text = event.target.value;
        setComment(text);
        console.log(comment);
    }

    useEffect(() => {
        setUsername(props.location.state.username);
        setPodcastname(props.location.state.audioName);

        const fileName = props.location.state.fileName;
    
        const s3_img_url = "https://cse442-projectvm.s3.amazonaws.com/podcast_image/" + fileName + ".png";
        const s3_audio_url = "https://cse442-projectvm.s3.amazonaws.com/podcast_audio/" + fileName + ".mp3";
        // const s3_des_url = "https://cse442-projectvm.s3.amazonaws.com/podcast_description/" + fileName + ".txt";

        setPicUrl(s3_img_url);
        setAudioUrl(s3_audio_url);
        // setDescription(s3_des_url);

    })

    return (
        <div className="podcast_background">
            <Sidebar/>
            <div className="audioplayer">
                <h1 className="title_podcast">{podcastname}</h1>
                <div className="infor">
                    <image className="coverPic_podcast" alt="Cover Picture" src={picUrl}/>
                    <p1 className="description_podcast">Description: {description}</p1>
                </div>
                <AudioPlayer src={audioUrl}/>
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