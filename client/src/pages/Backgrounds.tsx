import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';
import WindowParent from '../components/WindowParent';

const Backgrounds = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [backgrounds, setBackgrounds] = useState<any>([]);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/files', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const files = await response.json();

    setBackgrounds(files);
  };

  return (
    <>
      <Header title="Fondos" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div className="containerBackgrounds">
        <div className="backgroudStructures">
        {backgrounds.data ? backgrounds.data.map((background: any) => (
            <Card
              title={background.name}
              likes={1}
              path={`http://localhost:4000/files/${background.id}/streaming`}
              order={1}
              type='video'
              />
          )) : null}
        </div>
        <div className="paginationButtons">
          <Button title="Previous" />
          <WindowParent />
          <Button title="Next" />
        </div>
      </div>
    </>
  );
};

export default Backgrounds;
