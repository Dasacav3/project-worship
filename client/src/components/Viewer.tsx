import { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { ApiUrl, LocalUrl } from '../api/env_vars';

const Viewer = ({
  defaultUrlFile = `${ApiUrl}/files/default/streaming`,
  defaultFileType = 'video',
  defaultTextContent = ''
}: any) => {
  const [urlFile, setUrlFile] = useState(defaultUrlFile);
  const [textContent, setTextContent] = useState(defaultTextContent);
  const [fileType, setFileType] = useState(defaultFileType);

  document.body.style.overflow = 'hidden';

  const transitions = useTransition(textContent, {
    from: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 0 },
    enter: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1 },
    leave: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 0 },
    update: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1 },
    config: { mass: 1, tension: 120, friction: 30 },
  });

  const changeTextMarginLeft = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    for (let key of text) {
      key.style.paddingLeft = `${e}rem`;
    }
  };

  const changeTextMarginRight = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    for (let key of text) {
      key.style.paddingRight = `${e}rem`;
    }
  };

  const changeTextMarginTop = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    for (let key of text) {
      key.style.paddingTop = `${e}rem`;
    }
  };

  const changeTextMarginBottom = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    for (let key of text) {
      key.style.paddingBottom = `${e}rem`;
    }
  };

  const changeFontSize = (e: any) => {
    const text = Array.from(document.getElementsByClassName('viewerContent') as HTMLCollectionOf<HTMLElement>);

    for (let key of text) {
      key.style.fontSize = `${e}rem`;
    }
  };

  const processData = (e: any) => {
    const data = e;

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

    if (data.hasOwnProperty('del')) {
      setTextContent('');
      localStorage.setItem('textContent', '');
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
          <video className="background-effect" src={urlFile} autoPlay loop muted />
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
