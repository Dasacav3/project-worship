import { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { ApiUrl, LocalUrl } from '../api/env_vars';

const Viewer = ({
  defaultUrlFile = `${ApiUrl}/files/default/streaming`,
  defaultFileType = 'video',
  defaultTextContent = '',
  defaultActiveInfo = ''
}: any) => {
  const [urlFile, setUrlFile] = useState(defaultUrlFile);
  const [textContent, setTextContent] = useState(defaultTextContent);
  const [activeInfo, setActiveInfo] = useState(defaultActiveInfo);
  const [fileType, setFileType] = useState(defaultFileType);

  document.body.style.overflow = 'hidden';

  const transitionTextContent = useTransition(textContent, {
    from: { opacity: 0, transition: 'all 0.08s ease-in-out' },
    enter: { opacity: 1, transition: 'all 0.08s ease-in-out' },
  });

  const transitionActiveInfo = useTransition(activeInfo, {
    from: { opacity: 0, transition: 'all 0.08s ease-in-out' },
    enter: { opacity: 1, transition: 'all 0.08s ease-in-out' }
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
      localStorage.setItem('ml', data.ml);
    }
    if (data.hasOwnProperty('mt')) {
      changeTextMarginTop(data.mt);
      localStorage.setItem('mt', data.mt);
    }
    if (data.hasOwnProperty('mr')) {
      changeTextMarginRight(data.mr);
      localStorage.setItem('mr', data.mr);
    }
    if (data.hasOwnProperty('mb')) {
      changeTextMarginBottom(data.mb);
      localStorage.setItem('mb', data.mb);
    }
    if (data.hasOwnProperty('fs')) {
      changeFontSize(data.fs);
      localStorage.setItem('fs', data.fs);
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

    if (data.hasOwnProperty('activeInfo')) {
      setActiveInfo(data.activeInfo);
    }

    if (data.hasOwnProperty('del')) {
      setTextContent('');
      setActiveInfo('');
      localStorage.setItem('textContent', '');
      localStorage.setItem('activeInfo', '');
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
          {transitionTextContent((style, item) => (
            <animated.p className="viewerContent" style={style}>
              {item}
            </animated.p>
          ))}
          {transitionActiveInfo((style, item) => (
            <animated.p className="viewerContent" style={style}>
              {item}
            </animated.p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Viewer;
