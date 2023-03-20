import { useState, useEffect } from 'react';
import { ApiUrl } from '../api/env_vars';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import WindowVisor from '../context/WindowViewer';
import i18n from '../store/i18n';

const Bibles = ({ windowVisor }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [bibleVersions, setBibleVersions] = useState<any>([]);
  const [activeBibleVersion, setActiveBibleVersion] = useState<any>(1);
  const [activeBook, setActiveBook] = useState<any>(1);
  const [activeInfo, setActiveInfo] = useState<any>([]);
  const [dataBibles, setDataBibles] = useState<any>([]);
  const [totalChapters, setTotalChapters] = useState<any>([]);
  const [bibleStructure, setBibleStructure] = useState<any>([]);
  const [selectedIndexLyrics, setSelectedIndexLyrics] = useState(0);

  const biblesTranslations: any = i18n.t('bibles', { returnObjects: true });

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
    localStorage.setItem('activeInfo', message.activeInfo || '');

    return windowVisor.getWinObj()?.postMessage(message);
  };

  const handleKeyDownLyrics = (event: any) => {
    // If the down arrow is pressed
    if (event.keyCode === 40) {
      setSelectedIndexLyrics(Math.min(selectedIndexLyrics + 1, totalChapters.length - 1));
      sendMessage(
        {
          textContent: `${event.target.textContent}`,
          activeInfo: activeInfo
        },
        windowVisor
      );
    }

    // If the up arrow is pressed
    if (event.keyCode === 38) {
      setSelectedIndexLyrics(Math.max(selectedIndexLyrics - 1, 0));
      sendMessage(
        {
          textContent: `${event.target.textContent}`,
          activeInfo: activeInfo
        },
        windowVisor
      );
    }
  };

  return (
    <>
      <Header title={biblesTranslations.title} />
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <div className="bible-versions">
        <div>
          <ul className="text-sm text-gray-900 bg-white rounded-lg border border-gray-200 flex flex-row">
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
          <ul className="grid grid-cols-2 overflow-scroll">
            <div className="flex justify-center font-bold col-span-2">
              <p>{biblesTranslations.books}</p>
            </div>
            {bibleStructure ? (
              bibleStructure.map((item: any, index: number) => (
                <div
                  className="py-2 px-4 w-full rounded-md border border-gray-300 outline-none cursor-pointer"
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
          <div className="overflow-scroll">
            <div>
              <div className="flex justify-center font-bold">
                <p>{biblesTranslations.chapters}</p>
              </div>
              <div className="grid grid-cols-10 cursor-pointer">
                {totalChapters ? (
                  totalChapters.map((chapter: any, index: number) => (
                    <div
                      className="py-2 text-center w-full rounded-xl border border-gray-400 outline-none"
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
          <div className="overflow-auto">
            <div>
              <div className="flex justify-center font-bold">
                <p>{biblesTranslations.verses}</p>
              </div>
              <ul className="songLyrics cursor-pointer">
                {dataBibles ? (
                  dataBibles.map((lyric: any, index: number) => (
                    <li
                      key={index}
                      className="border border-gray-300 w-full text-center outline-none"
                      onClick={() =>
                        {
                          let info = `${lyric.bookName} ${lyric.chapter}:${index + 1}`
                          setActiveInfo(info)
                          sendMessage(
                            {
                              textContent: `${lyric.text}`,
                              activeInfo: info
                            },
                            windowVisor
                          )
                        }
                      }
                      tabIndex={0}
                      onKeyDown={handleKeyDownLyrics}
                      style={{ backgroundColor: index === selectedIndexLyrics ? 'lightgray' : 'white' }}
                    >
                      {`${index + 1}. ${lyric.text}`}
                    </li>
                  ))
                ) : (
                  <></>
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
