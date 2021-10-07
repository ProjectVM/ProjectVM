//import useState hook
import React, { useState } from "react";

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

//import from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';


function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showsLoginOrLogout = () => {
    isLoggedIn ? setIsLoggedIn(false) : setIsLoggedIn(true);
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
            <MenuItem icon={<FaHome />}>Home</MenuItem>
            <MenuItem icon={<BsUpload />}>Upload</MenuItem>
            <MenuItem icon={<FaSearch />}>Search</MenuItem>
            <MenuItem icon={<BsFillMusicPlayerFill />}>My Channel</MenuItem>
            <MenuItem icon={<BsClockHistory />}>History</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
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
          <Link to="/" />
        </MenuItem>
      </div>
    );

  }
}

export default Sidebar;