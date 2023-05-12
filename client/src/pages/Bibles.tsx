import { useState, useEffect } from 'react';
import { ApiUrl } from '../api/env_vars';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import List from '../components/List';
import i18n from '../store/i18n';

const Bibles = ({ windowVisor }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [bibleVersions, setBibleVersions] = useState<any>([]);
  const [activeBibleVersion, setActiveBibleVersion] = useState<any>(
    parseInt(localStorage.getItem('activeBibleVersion') || '1')
      ? parseInt(localStorage.getItem('activeBibleVersion') || '1')
      : 1
  );
  const [activeBook, setActiveBook] = useState<any>(1);
  const [dataBibles, setDataBibles] = useState<any>([]);
  const [totalChapters, setTotalChapters] = useState<any>([]);
  const [bibleStructure, setBibleStructure] = useState<any>([]);

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

    const data = await response.json();

    const structure = data.map((item: any) => {
      return {
        id: item.id,
        value: item.book,
        data: item
      };
    });

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

  const setTotalChaptersByBook = (book: { id: string; value: string; data?: any }) => {
    setActiveBook(book.id);

    let chapters = [];

    for (let i = 1; i <= book.data.chapters; i++) {
      chapters.push(i);
    }

    const chaptersByBook = chapters.map((chapter: any, index: number) => {
      return {
        id: index + 1,
        value: chapter
      };
    });

    setTotalChapters(chaptersByBook);
  };

  const searchBible = async (item: { id: string; value: string; data?: string }) => {
    const response = await fetch(`${ApiUrl}/bibles/${activeBibleVersion}?book=${activeBook}&chapter=${item.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    const lyrics = data.map((item: any, index: number) => {
      return {
        id: index + 1,
        value: item.text,
        data: item
      };
    });

    setDataBibles(lyrics);
  };

  const sendMessage = (item: { id: string; value: string; data?: any }) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    const message = {
      textContent: item.value,
      activeInfo: `${item.data.bookName} ${item.data.chapter}:${item.id}`
    };

    localStorage.setItem('textContent', message.textContent || '');
    localStorage.setItem('activeInfo', message.activeInfo || '');

    return windowVisor.getWinObj()?.postMessage(message);
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
                  onClick={() => {
                    setActiveBibleVersion(version.id);
                    localStorage.setItem('activeBibleVersion', version.id);
                  }}
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
          <div className="overflow-scroll">
            <div className="flex justify-center font-bold col-span-2">
              <p>{biblesTranslations.books}</p>
            </div>
            <List
              items={bibleStructure}
              onItemClick={setTotalChaptersByBook}
              listStyle="grid grid-cols-2 cursor-pointer text-center"
            />
          </div>
          <div className="overflow-scroll">
            <div>
              <div className="flex justify-center font-bold">
                <p>{biblesTranslations.chapters}</p>
              </div>
              <div className="cursor-pointer">
                <List
                  items={totalChapters}
                  onItemClick={searchBible}
                  listStyle="grid grid-cols-10"
                  itemStyle="py-2 text-center w-full rounded-xl border border-gray-400 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <div>
              <div className="flex justify-center font-bold">
                <p>{biblesTranslations.verses}</p>
              </div>
              <ul className="songLyrics cursor-pointer">
                <List items={dataBibles} onItemClick={sendMessage} listedItem={true} />
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
