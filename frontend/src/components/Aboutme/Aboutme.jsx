import React, { useState } from "react";
import Sidebar from "../Sidebar/sidebar.jsx"
import yufanPic from "./yufan.jpg"
import "./Aboutme.css";

function Aboutme(){
    return (
        <div className="background">
            <Sidebar/>
            <div className="aboutme">
                <h1 className="title">About</h1>
                <div className="contentWrapper_about">
                    <h1 className="description">Description Of ProjectVM:</h1>
                    <p1 className="text">Provide an unbiased universal platform to anyone and everyone to share groundbreaking ideas, serve valuable knowledge and inspire generations of listeners.</p1>
                    <h1 className="description">Members:</h1>
                    {/* yufan */}
                    <div className="introduction">
                        <img src={yufanPic} className="leftPic"></img>
                        <p className="intro_text">Hi, I am Yufan. I am a Senior Computer Science student at UB. Computer Science is something I am passionate about. I have some web develop experience before. Hope everyone will enjoy our web!</p>
                    </div>

                    {/* Please follow blow template to do the intro*/}
                    {/* <div className="introduction">
                        <img src={ } className="leftPic"></img>
                        <p className="intro_text"> </p>
                    </div> */}

                </div>
            </div>
        </div>
    )
}
export default Aboutme