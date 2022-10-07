import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const Backgrounds = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title='Fondos' />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </>
  );
};

export default Backgrounds;
