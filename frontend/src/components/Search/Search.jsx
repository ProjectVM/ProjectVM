import React, { useState, useEffect } from "react";
import { FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx";
import "./Search.css";

function Search(){
    const [search, setSearch] = useState("");
    // const []
    // Taken from MyChannel as it is very similar
    const [audioNameList, setAudioNameList] = useState(null);
    const [audioNameListIsLoaded, setAudioNameListIsLoaded] = useState(false);
    const [audioNameListError, setAudioNameListError] = useState("");

    useEffect( () => {
        const data = new FormData();
        data.append('username', search); // search term is a username

        fetch("/search", {
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
    }, );

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
                        <FaSearch className="icon"/>
                    </div>

                </div>
                <div className="contentWrapper_search">
                    {/* <div className="heading">
                        <h1 className="genre">Genre</h1>
                        <h1 className="viewall">View all</h1>
                    </div>
                  <Podcasts
                    error = {audioNameListError}
                    isLoaded = {audioNameListIsLoaded}
                    audioNameList = {audioNameList}
                  /> */}
                </div>
            </div>
        </div>
    );
}

export default Search;