//import useState hook
import React, { useState } from "react";

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

//import from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';


function Sidebar() {

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
            <MenuItem icon={<HiOutlineLogout />}>Log Out</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;