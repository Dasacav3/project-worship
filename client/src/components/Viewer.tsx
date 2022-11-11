import { useEffect, useState } from 'react';
import { LocalUrl } from '../api/env_vars';

const Viewer = () => {
  const [urlFile, setUrlFile] = useState('');
  const [textContent, setTextContent] = useState('');
  const [fileType, setFileType] = useState('video');

  document.body.style.overflow = 'hidden';

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin !== LocalUrl) {
        return;
      }

      if (e.data.urlFile != 'undefined') {
        setUrlFile(e.data.urlFile);
      }

      if (e.data.textContent != 'undefined') {
        setTextContent(e.data.textContent);
      }

      if (e.data.fileType != 'undefined') {
        setFileType(e.data.fileType);
      }
    });
  }, []);

  return (
    <>
      <div className="viewer">
        {fileType == 'video' ? <video className='background-effect' src={urlFile} autoPlay loop muted /> : <img className='background-effect' src={urlFile} alt="background" />}
        <div>
          <p className="viewerContent">{textContent}</p>
        </div>
      </div>
    </>
  );
};

export default Viewer;
