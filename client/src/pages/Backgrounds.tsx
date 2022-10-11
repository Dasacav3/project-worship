import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';
import WindowParent from '../components/WindowParent';

const Backgrounds = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [dataBackgrounds, setDataBackgrounds] = useState<any>([]);

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

    setDataBackgrounds(files);
  };

  return (
    <>
      <Header title="Fondos" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div className="containerBackgrounds">
        <div className="backgroudStructures">
          {dataBackgrounds.data
            ? dataBackgrounds.data.map((background: any, index: number) => (
                <Card
                  key={index}
                  title={background.name}
                  path={`http://localhost:4000/files/${background.id}/streaming`}
                  order={index + 1}
                  type={background.type.split('/')[0]}
                />
              ))
            : null}
        </div>
        <div className="paginationButtons">
        <Button
            title="Previous"
          />
          <Button
            title="Next"
          />
        </div>
      </div>
    </>
  );
};

export default Backgrounds;
