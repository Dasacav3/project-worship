import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';

const Backgrounds = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <Header title="Fondos" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div className="containerBackgrounds">
        <div className="backgroudStructures">
          <Card title="Fondo 1" likes={0} order={1} path="https://picsum.photos/200/300" type="image" />
          <Card title="Fondo 2" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 3" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 4" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 5" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 6" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 7" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 8" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 9" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 10" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 11" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 12" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 13" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 14" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 15" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
          <Card title="Fondo 16" likes={0} order={2} path="https://cdn.jwplayer.com/previews/M7CMlK2r" type="video" />
        </div>
        <div className="paginationButtons">
          <Button title="Previous" />
          <Button title="Next" />
        </div>
      </div>
    </>
  );
};

export default Backgrounds;
