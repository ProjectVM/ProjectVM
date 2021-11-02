import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar.jsx"
import "./Homepage.css";

function Homepage(){

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
                    <div className="podcastcontainer">
                        <Link to="/podcast" className="podcast"></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;