import { useState, useEffect } from 'react';
import { Range } from 'react-range';
import Button from './Button';
import Modal from './Modal';
import Uploader from './Uploader';

const Footer = ({ windowVisor }: any) => {
  const [marginLeft, setMarginLeft] = useState([0]);
  const [marginRight, setMarginRight] = useState([0]);
  const [marginTop, setMarginTop] = useState([0]);
  const [marginBottom, setMarginBottom] = useState([0]);
  const [fontSize, setFontSize] = useState([3]);

  const sendMessage = (message: any, windowVisor: any) => {
    if (windowVisor.checkIfClosed() != false || windowVisor.getWinObj()?.name === '') {
      windowVisor.openObj();
    }

    localStorage.setItem('textContent', message.textContent || '');

    return windowVisor.getWinObj()?.postMessage(message);
  };

  const openWindow = () => {
    windowVisor.openObj();
  };

  const setMarginLeftViewer = () => {
    windowVisor.getWinObj().postMessage({ ml: marginLeft }, '*');
  };

  const setMarginRightViewer = () => {
    windowVisor.getWinObj().postMessage({ mr: marginRight }, '*');
  };

  const setMarginTopViewer = () => {
    windowVisor.getWinObj().postMessage({ mt: marginTop }, '*');
  };

  const setMarginBottomViewer = () => {
    windowVisor.getWinObj().postMessage({ mb: marginBottom }, '*');
  };

  const setFontSizeViewer = () => {
    windowVisor.getWinObj().postMessage({ fs: fontSize }, '*');
  };

  const handleBackspace = (event: any) => {
    if (event.keyCode === 8) {
      sendMessage({ del: true }, windowVisor);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
  }, []);

  return (
    <>
      <div className="w-full bg-gray-200 footer">
        <div className="grid grid-rows-2 grid-flow-col gap-0">
          <div className="footer-content">
            <label>Margin Left</label>
            <Range
              step={1}
              min={0}
              max={100}
              values={marginLeft}
              onChange={values => {
                setMarginLeft(values);
                setMarginLeftViewer();
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-3 pr-2 bg-gray-500 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              )}
            />
          </div>
          <div className="footer-content">
            <label>Margin Right</label>
            <Range
              step={1}
              min={0}
              max={100}
              values={marginRight}
              onChange={values => {
                setMarginRight(values);
                setMarginRightViewer();
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-3 pr-2 bg-gray-500 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              )}
            />
          </div>
          <div className="footer-content">
            <label>Margin Bottom</label>
            <Range
              step={1}
              min={0}
              max={100}
              values={marginBottom}
              onChange={values => {
                setMarginBottom(values);
                setMarginBottomViewer();
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-3 pr-2 bg-gray-500 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              )}
            />
          </div>
          <div className="footer-content">
            <label>Margin Top</label>
            <Range
              step={1}
              min={0}
              max={100}
              values={marginTop}
              onChange={values => {
                setMarginTop(values);
                setMarginTopViewer();
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-3 pr-2 bg-gray-500 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              )}
            />
          </div>
          <div className="footer-content">
            <label>Font Size</label>
            <Range
              step={0.5}
              min={1}
              max={20}
              values={fontSize}
              onChange={values => {
                setFontSize(values);
                setFontSizeViewer();
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-3 pr-2 bg-gray-500 rounded-md">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-5 h-5 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              )}
            />
          </div>
          <div className="footer-content-buttons">
            <Button
              disabled={false}
              title={
                <>
                  Clean <span className="material-icons-outlined">backspace</span>
                </>
              }
              click={() => sendMessage({ del: true }, windowVisor)}
            />
            <Modal
              title="Upload Files"
              content={
                <div className="flex justify-center">
                  <Uploader />
                </div>
              }
              open={
                <>
                  Upload <span className="material-icons-outlined">upload</span>
                </>
              }
              save="Save"
              close="Close"
            />
            <Button
              title={
                <>
                  Open <span className="material-icons-outlined">open_in_new</span>
                </>
              }
              click={() => openWindow()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
