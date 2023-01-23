import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title="Bienvenido a Project Worship" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </>
  );
};

export default Home;
