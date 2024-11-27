import React from 'react';
import Sidebar from "../components/Menu/SideBar";
import Navbar from '../components/Menu/Navbar';
import CustomersComponent from '../components/Menu/Groups';

const MenuPage = () => {
  return (
    <>
    <Navbar/>
  <Sidebar/>
  <CustomersComponent/>
  </>
  );
};

export default MenuPage;

