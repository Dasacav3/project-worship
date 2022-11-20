import { useEffect, useState } from 'react';
import { ApiUrl, LocalUrl } from '../api/env_vars';

const Viewer = () => {
  const [urlFile, setUrlFile] = useState('');
  const [textContent, setTextContent] = useState('');
  const [fileType, setFileType] = useState('video');

  document.body.style.overflow = 'hidden';

  const changeTextMarginLeft = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    // Record all the text elements
    for (let key of text) {
      key.style.marginLeft = `${e}rem`;
    }
  };

  const changeTextMarginTop = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    // Record all the text elements
    for (let key of text) {
      key.style.marginTop = `${e}rem`;
    }
  };

  const changeFontSize = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);
    // Record all the text elements
    for (let key of text) {
      key.style.fontSize = `${e}px`;
    }
  };

  useEffect(() => {
    window.addEventListener('message', e => {
      console.trace(e);
      if (e.origin !== LocalUrl) {
        return;
      }

      if (e.data.urlFile != 'undefined' && e.data.urlFile != '') {
        setUrlFile(e.data.urlFile);
      }

      if (e.data.textContent != 'undefined' && e.data.textContent != '') {
        setTextContent(e.data.textContent);
      }

      if (e.data.fileType != 'undefined' && e.data.fileType != '') {
        setFileType(e.data.fileType);
      }

      if (e.data.px != 'undefined' && e.data.px != '') {
        changeTextMarginLeft(e.data.px);
      }

      if (e.data.em != 'undefined' && e.data.em != '') {
        changeTextMarginTop(e.data.em);
      }

      if (e.data.sz != 'undefined' && e.data.sz != '') {
        changeFontSize(e.data.sz);
      }
    });
  }, []);

  return (
    <>
      <div className="viewer">
        {fileType == 'video' && urlFile != '' ? (
          <video className="background-effect" src={urlFile} autoPlay loop muted />
        ) : (
          <video className="background-effect" src={`${ApiUrl}/files/default/streaming`} autoPlay loop muted />
        )}
        {fileType == 'image' && urlFile != '' ? (
          <img className="background-effect" src={urlFile} alt="background" />
        ) : (
          <></>
        )}
        <div>
          <p className="viewerContent">{textContent}</p>
        </div>
      </div>
    </>
  );
};

export default Viewer;
