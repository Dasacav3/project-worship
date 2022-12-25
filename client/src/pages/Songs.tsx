import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ApiUrl } from '../api/env_vars';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SideBar from '../components/Sidebar';
import SongForm from '../components/SongForm';
import WindowVisor from '../context/WindowViewer';

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

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData(`${ApiUrl}/songs`);
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

    setDataSongs(files);
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
        title: 'Success',
        text: 'Song saved successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      fetchData(`${ApiUrl}/songs`);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error saving song',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }

    setDataSongClicked([]);
    setDataSongLyrics([]);
    setSongIsClicked(false);
  };

  const searchSong = async (id: string) => {
    const response = await fetch(`${ApiUrl}/songs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await response.json();

    const arrayOfLyrics = song.lyrics.split('\n\n') as string[] | [];

    const lyrics = arrayOfLyrics.map((lyric: string, index: number) => {
      return (
        <div
          key={index}
          className="border w-full text-center"
          onClick={() =>
            sendMessage(
              {
                textContent: lyric
              },
              windowVisor
            )
          }
        >
          {lyric}
        </div>
      );
    });

    setSongIsClicked(true);
    setDataSongClicked(song);
    setDataSongLyrics(lyrics);
  };

  const sendMessage = (message: any, windowVisor: WindowVisor) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    localStorage.setItem('textContent', message.textContent || '');

    return windowVisor.getWinObj()?.postMessage(message);
  };

  const deleteSong = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this song!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
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
          title: 'Success',
          text: 'Song deleted successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        fetchData(`${ApiUrl}/songs`);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error deleting song',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  };

  return (
    <>
      <Header title="Canciones" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div>
        <div className="flex flex-row justify-end w-11/12 mt-3 mb-3">
          {songIsClicked ? (
            <>
              <Modal
                title="Edit song"
                content={
                  <SongForm
                    songTitle={dataSongClicked.title}
                    songType={dataSongClicked.type}
                    songTone={dataSongClicked.tone}
                    songLyrics={dataSongClicked.lyrics}
                    songIsClicked={true}
                  />
                }
                open="Edit Song"
                save="Save"
                close="Close"
                click={() => saveOrUpdateSong(dataSongClicked.id)}
              />
              <Button
                title={
                  <>
                    Delete<span className="material-icons-outlined">delete</span>
                  </>
                }
                click={() => deleteSong(dataSongClicked.id)}
              />
            </>
          ) : (
            <></>
          )}
          <Modal
            title="New song"
            content={<SongForm />}
            open="Add Song"
            save="Save"
            close="Close"
            click={() => saveOrUpdateSong()}
          />
        </div>
      </div>
      <div className="containerSongs">
        <div className="songStructures">
          <ul className="text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
            {dataSongs.data ? (
              dataSongs.data.map((song: any, index: number) => (
                <li
                  className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200"
                  key={index}
                  onClick={() => searchSong(song.id)}
                >
                  {song.title} - {song.type}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          <div>
            <div className="">
              <div className="flex justify-center font-bold">
                <p>Lyrics</p>
              </div>
              <div className="songLyrics">{dataSongLyrics}</div>
            </div>
          </div>
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
      <Footer windowVisor={windowVisor} />
    </>
  );
};

export default Songs;
