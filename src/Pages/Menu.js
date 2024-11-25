import React from 'react';
import Sidebar from "../components/Menu/SideBar";
import Navbar from '../components/Menu/Navbar';
import FriendGroups from '../components/Menu/Groups';

const MenuPage = () => {
  return (
    <>
    <Navbar/>
  <Sidebar/>
  <FriendGroups/>
  </>
  );
};

export default MenuPage;

