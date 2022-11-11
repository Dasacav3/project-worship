import { useState, useEffect } from 'react';
import { ApiUrl, LocalUrl } from '../api/env_vars';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';
import Uploader from '../components/Uploader';

const Backgrounds = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [dataBackgrounds, setDataBackgrounds] = useState<any>([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [buttonPrevStatus, setButtonPrevStatus] = useState(false);
  const [buttonNextStatus, setButtonNextStatus] = useState(false);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData(`${ApiUrl}/files`);
  }, []);

  const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const files = await response.json();

    setPrevPage(files.pagination.prev);
    setNextPage(files.pagination.next);

    if (files.pagination.prev === null) {
      setButtonPrevStatus(true);
    } else {
      setButtonPrevStatus(false);
    }

    if (files.pagination.next === null) {
      setButtonNextStatus(true);
    } else {
      setButtonNextStatus(false);
    }

    setDataBackgrounds(files);
  };

  let childWindow: Window | null = null;

  const openWindow = () => {
    childWindow = window.open(
      `${LocalUrl}/viewer`,
      'viewer',
      'width=500,height=400'
    );
  };

  const sendMessage = (url: string, textContent: string, fileType: string) => {
    if (childWindow) {
      childWindow.postMessage(
        {
          urlFile: url,
          textContent: textContent,
          fileType: fileType
        },
        `${LocalUrl}/viewer`
      );
    }
  };

  return (
    <>
      <Header title="Fondos" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row">
            <Modal
              title="Upload Multimedia Files"
              content={
                <div className="flex justify-center">
                  <Uploader />
                </div>
              }
              open="Upload File"
              save="Save"
              close="Close"
            />
            <Button
              title="Open Viewer"
              click={() => openWindow()}
            />
          </div>
        </div>
      </div>
      <div className="containerBackgrounds">
        <div className="backgroudStructures">
          {dataBackgrounds.data
            ? dataBackgrounds.data.map((background: any, index: number) => (
                <Card
                  key={index}
                  title={background.name}
                  path={`${ApiUrl}/files/${background.id}/streaming`}
                  order={index + 1}
                  type={background.type.split('/')[0]}
                  click={() => sendMessage(`${ApiUrl}/files/${background.id}/streaming`, 'Hi!', background.type.split('/')[0])}
                />
              ))
            : null}
        </div>
        <div className="paginationButtons">
          <Button
            title="Previous"
            click={() => fetchData(`${ApiUrl}/files?page=${prevPage}&entries=10`)}
            disabled={buttonPrevStatus}
          />
          <Button
            title="Next"
            click={() => fetchData(`${ApiUrl}/files?page=${nextPage}&entries=10`)}
            disabled={buttonNextStatus}
          />
        </div>
      </div>
    </>
  );
};

export default Backgrounds;
