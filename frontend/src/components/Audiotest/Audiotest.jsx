import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<AudioFilePlayer />, document.getElementById("root"));

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>;

function AudioFilePlayer(props) {
  let name = props.name;
  let id = props.id;
  let s3_url =
    "https://cse442-projectvm.s3.amazonaws.com/podcast_audio/yufansun_Brooks.mp3?AWSAccessKeyId=AKIAX7VKNCZFMBVD4UF7&Signature=VPHTdYq36ytnfulaoaZwZd136Og%3D&Expires=1636226532";

  const handleAudioPlay = (s3_url_link, state) => {
    var audio = new Audio(s3_url_link);
    if (state) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="AudioFileListItem">
      <div className="AudioFileListElements">
        <a
          href="javascript:void(0);"
          onClick={() => handleAudioPlay(s3_url, true)}
        >
          <span className="AudioFilePlayButton">
            <box-icon name="play-circle" color="#ffffff" size="sm"></box-icon>
          </span>
          <span className="AudioFilePlayButtonTitle">Play</span>
        </a>
        <a
          href="javascript:void(0);"
          // onClick={handleDownloadPlay(s3_url, true)}
        >
          <span className="AudioFileDownloadButton">
            <box-icon
              name="download"
              type="solid"
              color="#ffffff"
              size="sm"
            ></box-icon>
          </span>
          <span className="AudioFileDownloadButtonTitle">Download</span>
        </a>
      </div>
    </div>
  );
}

export default AudioFilePlayer;
