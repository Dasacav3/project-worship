import { useEffect, useState } from 'react';
import Button from './Button';

const WindowParent = () => {
  const [receievedMessage, setReceivedMessage] = useState('');

  let childWindow: any;

  const sendMessage = () => {
    if (!childWindow) return;
    childWindow.postMessage('Hello son!', 'http://localhost:5173');
  };

  const openWindow = () => {
    childWindow = window.open('http://localhost:5173/viewer', 'Viewer', 'width=500,height=500');
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
    <div>
      <Button click={openWindow} title="Open Window" />
      <Button click={sendMessage} title="Send message To Child" />
      <p>{receievedMessage}</p>
    </div>
  );
};

export default WindowParent;
