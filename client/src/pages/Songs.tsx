import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const Songs = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title='Canciones' />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </>
  );
};

export default Songs;
