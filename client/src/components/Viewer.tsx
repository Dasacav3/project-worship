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

  const changeTextMarginRight = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);
    // Record all the text elements
    for (let key of text) {
      key.style.marginRight = `${e}rem`;
    }
  };

  const changeTextMarginTop = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);
    // Record all the text elements
    for (let key of text) {
      key.style.marginTop = `${e}rem`;
    }
  };

  const changeTextMarginBottom = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);
    // Record all the text elements
    for (let key of text) {
      key.style.marginBottom = `${e}rem`;
    }
  };

  const changeFontSize = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);
    // Record all the text elements
    for (let key of text) {
      key.style.fontSize = `${e}px`;
    }
  };

  const processData = (e: any) => {
    const data = e;

    console.log(data, typeof data);

    if (data.hasOwnProperty('ml')) {
      changeTextMarginLeft(data.ml);
    }
    if (data.hasOwnProperty('mt')) {
      changeTextMarginTop(data.mt);
    }
    if (data.hasOwnProperty('mr')) {
      changeTextMarginRight(data.mr);
    }
    if (data.hasOwnProperty('mb')) {
      changeTextMarginBottom(data.mb);
    }
    if (data.hasOwnProperty('fs')) {
      changeFontSize(data.fs);
    }
    if (data.hasOwnProperty('fileType')) {
      setFileType(data.fileType);
    }
    if (data.hasOwnProperty('urlFile')) {
      setUrlFile(data.urlFile);
    }
    if (data.hasOwnProperty('textContent')) {
      setTextContent(data.textContent);
    }
  };

  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.origin !== LocalUrl) {
        return;
      }

      processData(e.data);
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
