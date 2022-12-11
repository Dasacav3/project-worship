import { useState } from 'react';

const SongForm = (props: any) => {
  const [songTitle, setSongTitle] = useState(props.songTitle || '');
  const [songType, setSongType] = useState(props.songType || '');
  const [songTone, setSongTone] = useState(props.songTone || '');
  const [songLyrics, setSongLyrics] = useState(props.songLyrics || '');

  const handleSongTitle = (e: any) => {
    setSongTitle(e.target.value);
  };

  const handleSongType = (e: any) => {
    setSongType(e.target.value);
  };

  const handleSongTone = (e: any) => {
    setSongTone(e.target.value);
  };

  const handleSongLyrics = (e: any) => {
    setSongLyrics(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-3" id="formSong">
          <div className="mb-4 col-span-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songTitle">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="songTitle"
              type="text"
              placeholder="Title"
              value={songTitle}
              onChange={handleSongTitle}
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songType">
              Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="songType"
              type="text"
              placeholder="Type"
              value={songType}
              onChange={handleSongType}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songTone">
              Tone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="songTone"
              type="text"
              placeholder="Tone"
              value={songTone}
              onChange={handleSongTone}
            />
          </div>
          <div className="mb-4 col-span-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songLyrics">
              Lyrics
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="songLyrics"
              placeholder="Lyrics"
              value={songLyrics}
              onChange={handleSongLyrics}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;
