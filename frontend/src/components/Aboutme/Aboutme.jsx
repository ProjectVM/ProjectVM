import React, { useState } from "react";
import Sidebar from "../Sidebar/sidebar.jsx";
import "./Aboutme.css";

function Aboutme() {
  return (
    <div className="background">
      <Sidebar />
      <div className="aboutme">
        <h1 className="title">About</h1>
        <div className="contentWrapper_about">
          <h1 className="descriptionVM">Description Of ProjectVM:</h1>
          <p1 className="text">
            Provide an unbiased universal platform to anyone and everyone to
            share groundbreaking ideas, serve valuable knowledge and inspire
            generations of listeners.
          </p1>
          <h1 className="descriptionVM">Members:</h1>
          {/* yufan */}
          <div className="introduction">
            <p className="intro_text">
              Hi, I am Yufan. I am a Senior Computer Science student at UB.
              Computer Science is something I am passionate about. I have some
              web develop experience before. Hope everyone will enjoy our web!
            </p>
          </div>
          {/* Nee; */}
          <div className="introduction">
            <p className="intro_text">
              Hi, I am Neel. I am a Senior Computer Engineering Student that is
              planning on being a Software Engineering Developer in the future.
              I am passionate about learning more about Data Visualization and
              A.I. tech.
            </p>
          </div>
          {/* Qiuhong */}
          <div className="introduction">
            <p className="intro_text">
              Hi, I am Qiuhong. I am a senior at University at Buffalo, pursuing
              B.S. in Computer Science. I love coding because it brings to me a
              great sense of accomplishment that comes from solving the problem by
              programming. In my spare time, I enjoy movies and bodybuilding.
            </p>
          </div>
          {/* Vinci Wu */}
          <div className="introduction">
            <p className="intro_text">
              I am Vinci Wu, a senior at University at Buffalo currently pursuing
              my Bachelors of Science in Computer Science.
            </p>
          </div>
          {/* Anthony Morales */}
          <div className="introduction">
            <p className="intro_text">
              I am Anthony Morales, a senior at University at Buffalo pursuing
              my Bachelors of Science in Computer Science. My hobbies are soccer, rugby, and playing chess.
            </p>
          </div>
		  {/* Steven Quan */}
		  <div className="introduction">
            <p className="intro_text"> 
				I am Steven Quan, a senior at University at Buffalo, pursuing my 
				B.S. in Computer Science.
			</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Aboutme;
