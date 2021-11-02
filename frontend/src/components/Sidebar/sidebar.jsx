//import useState hook
import React, { useState, useEffect } from "react";

//import router
import { Link } from 'react-router-dom';

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter } from 'react-pro-sidebar';

//import react icons
import { FaGem, FaHeart, FaHome, FaSearch} from "react-icons/fa";
import { BsFillMusicPlayerFill, BsClockHistory, BsUpload } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

//import from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';


function Sidebar(props) {
  const name = sessionStorage.getItem("username");
  const [username, setUsername] = useState(name);
  const [isLoggedIn, setIsLoggedIn] = useState(name ? true : false);

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
  });

  const showsLoginOrLogout = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("username");
      setIsLoggedIn(false);
    } else {
      setUsername("");
      setIsLoggedIn(true);
    }
  };

  return (
    <div id="sidebar">
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
             <p>ProjectVM</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu >
            <MenuItem icon={<FaHome />}>
              Home
              <Link to = "/"/>
            </MenuItem>
            <MenuItem icon={<BsUpload />}>
              Upload
              <Link to ="/upload" />
            </MenuItem>
            <MenuItem icon={<FaSearch />}>Search</MenuItem>
            <MenuItem icon={<BsFillMusicPlayerFill />}>My Channel</MenuItem>
            <MenuItem icon={<BsClockHistory />}>History</MenuItem>
            <MenuItem icon={<AiOutlineExclamationCircle />}>
              About
              <Link to ="/about"/>
              </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <ShowUsername username={username} />
            <FooterContent
              isLoggedIn={isLoggedIn}
              click={showsLoginOrLogout}
            />
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

function ShowUsername(props) {
  if (props.username) {

    return (
      <MenuItem className="usernameOnSidebar">
        {props.username}
      </MenuItem>
    );
  } else {
    return <p />;
  }
}

function FooterContent(props) {
  if (props.isLoggedIn) {

    return (
      <div onClick={props.click}>
        <MenuItem icon={<HiOutlineLogout />} >
          Log Out
        </MenuItem>
      </div>
    );

  } else {

    return (
      <div onClick={props.click}>
        <MenuItem icon={<BiLogIn />} >
          Log In
          <Link to="/login" />
        </MenuItem>
      </div>
    );

  }
}

export default Sidebar;