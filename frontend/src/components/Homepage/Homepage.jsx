import React, { useState } from "react";
import Sidebar from "../Sidebar/sidebar.jsx"
import "./Homepage.css";

function Homepage(){

    return (
        <div className="background">
            <Sidebar/>
            <div className="homepage">
                <h1 className="title">Home</h1>
                <div className="contentWrapper">
                    <h1 className="genre">Genre</h1>
                    <div className="podcastcontainer">
                        <div className="podcast"></div>
                        <div className="podcast"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;