import { useEffect, useState } from 'react';

const WindowChild = () => {
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = () => {
    window.opener.postMessage('Hi dad!', 'http://localhost:5173');
  };

  useEffect(() => {
    window.addEventListener('message', (e) => {
        if (e.origin !== 'http://localhost:5173')
          return;
        console.log(e);
        setReceivedMessage('Got this message from parent: ' + e.data);
      });
  }, []);

  return (
    <>
      <div className='viewer'>
        <video className='video' src='http://localhost:4000/files/28aa7812-2174-49b4-addc-3303e853b7d3/streaming' autoPlay loop muted />
        <div>
          <p className='viewerContent'>Video</p>
        </div>
      </div>
    </>
  );
};

export default WindowChild;
