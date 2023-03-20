import { useState, useEffect } from 'react';
import { ApiUrl } from '../api/env_vars';
import Button from '../components/Button';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import WindowVisor from '../context/WindowViewer';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import i18n from '../store/i18n';

const Backgrounds = ({ windowVisor }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [dataBackgrounds, setDataBackgrounds] = useState<any>([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [buttonPrevStatus, setButtonPrevStatus] = useState(false);
  const [buttonNextStatus, setButtonNextStatus] = useState(false);

  const backgroundsTranslations : any = i18n.t('backgrounds', { returnObjects: true });

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

  const sendMessage = (message: any, windowVisor: WindowVisor) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    localStorage.setItem('urlFile', message.urlFile || '');
    localStorage.setItem('fileType', message.fileType || '');

    return windowVisor.getWinObj()?.postMessage(message);
  };

  const deleteFile = async (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();

    const response = await fetch(`${ApiUrl}/files/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'File deleted successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      });
      fetchData(`${ApiUrl}/files`);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error deleting file',
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  };

  return (
    <>
      <Header title={backgroundsTranslations.title} />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row"></div>
        </div>
      </div>
      <div className="containerBackgrounds">
        <div className="paginationButtons">
          <Button
            title={
              <>
                <span className="material-icons">chevron_left</span>
              </>
            }
            click={() => fetchData(`${ApiUrl}/files?page=${prevPage}&entries=10`)}
            disabled={buttonPrevStatus}
          />
          <Button
            title={
              <>
                <span className="material-icons">chevron_right</span>
              </>
            }
            click={() => fetchData(`${ApiUrl}/files?page=${nextPage}&entries=10`)}
            disabled={buttonNextStatus}
          />
        </div>
        <div className="backgroudStructures">
          {dataBackgrounds.data
            ? dataBackgrounds.data.map((background: any, index: number) => (
                <Card
                  id={background.id}
                  delete={(event, id) => deleteFile(event, id)}
                  key={index}
                  title={background.name}
                  path={`${ApiUrl}/files/${background.id}/streaming`}
                  order={index + 1}
                  type={background.type.split('/')[0]}
                  click={() =>
                    sendMessage(
                      {
                        urlFile: `${ApiUrl}/files/${background.id}/streaming`,
                        fileType: background.type.split('/')[0]
                      },
                      windowVisor
                    )
                  }
                />
              ))
            : null}
        </div>
      </div>
      <Footer windowVisor={windowVisor} />
    </>
  );
};

export default Backgrounds;
