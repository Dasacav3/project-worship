import { useState, useEffect } from 'react';
import { ApiUrl } from '../api/env_vars';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import WindowVisor from '../context/WindowViewer';

const Bibles = ({ windowVisor }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [bibleVersions, setBibleVersions] = useState<any>([]);
  const [activeBibleVersion, setActiveBibleVersion] = useState<any>(1);
  const [activeBook, setActiveBook] = useState<any>(1);
  const [dataBibles, setDataBibles] = useState<any>([]);
  const [totalChapters, setTotalChapters] = useState<any>([]);
  const [bibleStructure, setBibleStructure] = useState<any>([]);
  const [selectedIndexLyrics, setSelectedIndexLyrics] = useState(0);

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData(`${ApiUrl}/bibles`);
    fetchStructure(`${ApiUrl}/bibles/structure`);
  }, []);

  const fetchStructure = async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const structure = await response.json();

    setBibleStructure(structure);
  };

  const fetchData = async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const bibleVersions = await response.json();

    setBibleVersions(bibleVersions);
  };

  const setTotalChaptersByBook = (book: any) => {
    setActiveBook(book.id);

    let chapters = [];

    for (let i = 1; i <= book.chapters; i++) {
      chapters.push(i);
    }

    setTotalChapters(chapters);
  };

  const searchBible = async (chapter: number) => {
    const response = await fetch(`${ApiUrl}/bibles/${activeBibleVersion}?book=${activeBook}&chapter=${chapter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const lyrics = await response.json();

    setDataBibles(lyrics);
  };

  const sendMessage = (message: any, windowVisor: WindowVisor) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    localStorage.setItem('textContent', message.textContent || '');

    return windowVisor.getWinObj()?.postMessage(message);
  };

  const handleKeyDownLyrics = (event: any) => {
    // If the down arrow is pressed
    if (event.keyCode === 40) {
      setSelectedIndexLyrics(Math.min(selectedIndexLyrics + 1, totalChapters.length - 1));
      sendMessage(
        {
          textContent: event.target.textContent
        },
        windowVisor
      );
    }

    // If the up arrow is pressed
    if (event.keyCode === 38) {
      setSelectedIndexLyrics(Math.max(selectedIndexLyrics - 1, 0));
      sendMessage(
        {
          textContent: event.target.textContent
        },
        windowVisor
      );
    }
  };

  return (
    <>
      <Header title="Biblias" />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div>
        <div className="flex flex-row justify-end w-11/12 mt-3 mb-3">
          <ul className="text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 flex flex-row">
            {bibleVersions.data ? (
              bibleVersions.data.map((version: any, index: number) => (
                <li
                  className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200"
                  key={index}
                  onClick={() => setActiveBibleVersion(version.id)}
                >
                  <input
                    id={`bibleVersion${index}`}
                    type="radio"
                    name="radio"
                    className="hidden"
                    {...{ defaultChecked: activeBibleVersion === version.id }}
                  />
                  <label htmlFor={`bibleVersion${index}`} className="flex items-center cursor-pointer">
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                    {version.name}
                  </label>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
      <div className="containerBibles">
        <div className="bibleStructures">
          <ul className="grid grid-cols-2">
            <div className="flex justify-center font-bold col-span-2">
              <p>Books</p>
            </div>
            {bibleStructure ? (
              bibleStructure.map((item: any, index: number) => (
                <div
                  className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 outline-none"
                  key={index}
                  onClick={() => setTotalChaptersByBook(item)}
                >
                  {item.book}
                </div>
              ))
            ) : (
              <></>
            )}
          </ul>
          <div>
            <div className="">
              <div className="flex justify-center font-bold">
                <p>Chapters</p>
              </div>
              <div className="grid grid-cols-10">
                {totalChapters ? (
                  totalChapters.map((chapter: any, index: number) => (
                    <div
                      className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 outline-none"
                      key={index}
                      onClick={() => searchBible(chapter)}
                    >
                      {chapter}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="flex justify-center font-bold">
                <p>Lyrics</p>
              </div>
              <ul className="songLyrics">
                {dataBibles ? (
                  dataBibles.map((lyric: any, index: number) => (
                    <li
                      key={index}
                      className="border w-full text-center outline-none"
                      onClick={() =>
                        sendMessage(
                          {
                            textContent: lyric.text
                          },
                          windowVisor
                        )
                      }
                      tabIndex={0}
                      onKeyDown={handleKeyDownLyrics}
                      style={{ backgroundColor: index === selectedIndexLyrics ? 'lightgray' : 'white' }}
                    >
                      {`${index + 1}. ${lyric.text}`}
                    </li>
                  ))
                ) : (
                  <>Que paso?</>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer windowVisor={windowVisor} />
    </>
  );
};

export default Bibles;
