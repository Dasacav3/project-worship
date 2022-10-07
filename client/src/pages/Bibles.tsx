import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const Bibles = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title='Biblias' />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </>
  );
};

export default Bibles;
