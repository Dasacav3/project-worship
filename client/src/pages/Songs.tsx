import { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';

const Songs = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title="Canciones" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <Modal title="Añadir canción" open="Nuevo" close="Cerrar" content="Contenido" save="Guardar" />
    </>
  );
};

export default Songs;
