import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { ApiUrl } from '../api/env_vars';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';
import SongForm from '../components/SongForm';
import WindowVisor from '../context/WindowViewer';
import i18n from '../store/i18n';
import List from '../components/List';

const Songs = ({ windowVisor }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [dataSongs, setDataSongs] = useState<any>([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [buttonPrevStatus, setButtonPrevStatus] = useState(false);
  const [buttonNextStatus, setButtonNextStatus] = useState(false);
  const [dataSongClicked, setDataSongClicked] = useState<any>([]);
  const [dataSongLyrics, setDataSongLyrics] = useState<any>([]);
  const [songIsClicked, setSongIsClicked] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchData(`${ApiUrl}/songs`);
  }, []);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const handleFile = (e: any) => {
    handleUpload(e.target.files[0], e);
  };

  const handleUpload = async (file: File, event: any) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${ApiUrl}/songs/import`, {
      method: 'POST',
      body: formData
    });

    await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: songsTranslation.importSuccessTitle,
        text: songsTranslation.importSuccess,
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      });
    } else {
      Swal.fire({
        title: songsTranslation.importErrorTitle,
        text: songsTranslation.importError,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }

    event.target.value = null;
  };

  const songsTranslation: any = i18n.t('songs', { returnObjects: true });

  const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    setPrevPage(data.pagination.prev);
    setNextPage(data.pagination.next);

    if (data.pagination.prev === null) {
      setButtonPrevStatus(true);
    } else {
      setButtonPrevStatus(false);
    }

    if (data.pagination.next === null) {
      setButtonNextStatus(true);
    } else {
      setButtonNextStatus(false);
    }

    const songs = data.data.map((song: any, index: number) => {
      return {
        id: song.id,
        value: song.title
      };
    });

    setDataSongs(songs);
  };

  const saveOrUpdateSong = async (id?: string) => {
    const songTitle = document.getElementById('songTitle') as HTMLInputElement;
    const songTone = document.getElementById('songTone') as HTMLInputElement;
    const songType = document.getElementById('songType') as HTMLInputElement;
    const songLyrics = document.getElementById('songLyrics') as HTMLInputElement;

    const url = id ? `${ApiUrl}/songs/${id}` : `${ApiUrl}/songs`;

    const response = await fetch(url, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: songTitle.value,
        tone: songTone.value,
        type: songType.value,
        lyrics: songLyrics.value
      })
    });

    await response.json();

    if (response.status === 201 || response.status === 200) {
      Swal.fire({
        title: songsTranslation.successTitle,
        text: songsTranslation.success,
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      });
      window.location.reload();
    } else {
      Swal.fire({
        title: songsTranslation.errorTitle,
        text: songsTranslation.error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }
  };

  const searchSong = async (item: { id: string; value: string }) => {
    const response = await fetch(`${ApiUrl}/songs/${item.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await response.json();

    const arrayOfLyrics = song.lyrics.split('\n\n') as string[] | [];

    setSongIsClicked(true);
    setDataSongClicked(song);
    setDataSongLyrics(
      arrayOfLyrics.map((lyric: string, index: number) => {
        return {
          id: index,
          value: lyric
        };
      })
    );
  };

  const sendMessage = (item: { id: string; value: string }) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    localStorage.setItem('textContent', item.value || '');

    return windowVisor.getWinObj()?.postMessage({
      textContent: item.value,
      activeInfo: ''
    });
  };

  const deleteSong = async (id: string) => {
    const result = await Swal.fire({
      title: songsTranslation.deleteConfirmTitle,
      text: songsTranslation.deleteConfirm,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: songsTranslation.accept,
      cancelButtonText: songsTranslation.cancel
    });

    if (result.isConfirmed) {
      const response = await fetch(`${ApiUrl}/songs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      await response.json();

      if (response.status === 200) {
        Swal.fire({
          title: songsTranslation.deleteSuccessTitle,
          text: songsTranslation.deleteSuccess,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        fetchData(`${ApiUrl}/songs`);
      } else {
        Swal.fire({
          title: songsTranslation.deleteErrorTitle,
          text: songsTranslation.deleteError,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  };

  const searchSongByNameOrContent = async (e: any) => {
    setInput(e.target.value);
    const response = await fetch(`${ApiUrl}/songs?search=${e.target.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    <div className=""></div>;
    const songs = data.data.map((song: any, index: number) => {
      return {
        id: song.id,
        value: song.title
      };
    });

    setDataSongs(songs);
  };

  return (
    <>
      <Header title={songsTranslation.title} />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div className="w-10/12 m-auto">
        <div className="flex flex-row justify-between mt-3 mb-3">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={searchSongByNameOrContent}
              placeholder={songsTranslation.search}
              className="border border-gray-300 rounded px-4 py-2"
            />
            <Modal
              title={songsTranslation.edit}
              content={
                <div className="w-full h-full flex">
                  <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                    <div
                      className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                      style={{
                        width: '450px'
                      }}
                    >
                      <div className="flex w-full justify-center">
                        <span className="material-icons text-yellow-700 text-6xl">upload_file</span>
                      </div>
                      <div className="input_field flex flex-col w-max mx-auto text-center">
                        <label>
                          <input className="text-sm cursor-pointer w-36 hidden" type="file" onChange={handleFile} />
                          <div className="bg-yellow-700 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow-600">
                            Select
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
              open={songsTranslation.import}
              saveButton={true}
              closeButton={true}
              save={songsTranslation.save}
              close={songsTranslation.close}
              click={() => saveOrUpdateSong(dataSongClicked.id)}
            />
          </div>
          {songIsClicked ? (
            <>
              <Modal
                title={songsTranslation.edit}
                content={
                  <SongForm
                    songTitle={dataSongClicked.title}
                    songType={dataSongClicked.type}
                    songTone={dataSongClicked.tone}
                    songLyrics={dataSongClicked.lyrics}
                    songIsClicked={true}
                  />
                }
                open={songsTranslation.edit}
                saveButton={true}
                closeButton={true}
                save={songsTranslation.save}
                close={songsTranslation.close}
                click={() => saveOrUpdateSong(dataSongClicked.id)}
              />
              <Button
                title={
                  <>
                    {songsTranslation.delete}
                    <span className="material-icons-outlined">delete</span>
                  </>
                }
                click={() => deleteSong(dataSongClicked.id)}
              />
            </>
          ) : (
            <></>
          )}
          <Modal
            title={songsTranslation.new}
            content={<SongForm />}
            open={songsTranslation.add}
            save={songsTranslation.save}
            close={songsTranslation.close}
            saveButton={true}
            closeButton={true}
            click={() => saveOrUpdateSong()}
          />
        </div>
      </div>
      <div className="containerSongs">
        <div className="paginationButtons">
          <Button
            title={
              <>
                <span className="material-icons">chevron_left</span>
              </>
            }
            click={() => fetchData(`${ApiUrl}/songs?page=${prevPage}&entries=10`)}
            disabled={buttonPrevStatus}
          />
          <Button
            title={
              <>
                <span className="material-icons">chevron_right</span>
              </>
            }
            click={() => fetchData(`${ApiUrl}/songs?page=${nextPage}&entries=10`)}
            disabled={buttonNextStatus}
          />
        </div>
        <div className="songStructures">
          <div className="font-medium text-gray-900 bg-white rounded-lg border border-gray-200 cursor-pointer overflow-scroll">
            <div className="flex justify-center font-bold border-none">
              <p>{songsTranslation.title}</p>
            </div>
            <List items={dataSongs} onItemClick={searchSong} />
          </div>
          <div className="overflow-scroll">
            <div className="font-medium text-gray-900 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <div className="flex justify-center font-bold">
                <p>{songsTranslation?.lyrics}</p>
              </div>
              <List items={dataSongLyrics} onItemClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
      <Footer windowVisor={windowVisor} />
    </>
  );
};

export default Songs;
