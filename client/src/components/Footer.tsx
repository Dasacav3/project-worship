import { useState } from 'react';
import { Range } from 'react-range';
import Button from './Button';
import Modal from './Modal';
import Uploader from './Uploader';

const Footer = ({ windowVisor }: any) => {
  const [marginLeft, setMarginLeft] = useState([0]);
  const [marginRight, setMarginRight] = useState([0]);
  const [marginTop, setMarginTop] = useState([0]);
  const [marginBottom, setMarginBottom] = useState([0]);
  const [fontSize, setFontSize] = useState([20]);

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

  return (
    <>
      <div className="w-full h-20 bg-gray-200 footer">
        <div className="grid grid-rows-2 grid-flow-col gap-0">
          <Range
            step={1}
            min={-100}
            max={100}
            values={marginLeft}
            onChange={values => {
              setMarginLeft(values);
              setMarginLeftViewer();
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-500 rounded-md">
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
          <Range
            step={1}
            min={-100}
            max={100}
            values={marginRight}
            onChange={values => {
              setMarginRight(values);
              setMarginRightViewer();
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-500 rounded-md">
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
          <Range
            step={1}
            min={-100}
            max={100}
            values={marginBottom}
            onChange={values => {
              setMarginBottom(values);
              setMarginBottomViewer();
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-500 rounded-md">
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
          <Range
            step={1}
            min={-100}
            max={100}
            values={marginTop}
            onChange={values => {
              setMarginTop(values);
              setMarginTopViewer();
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-500 rounded-md">
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
          <Range
            step={1}
            min={20}
            max={400}
            values={fontSize}
            onChange={values => {
              setFontSize(values);
              setFontSizeViewer();
            }}
            renderTrack={({ props, children }) => (
              <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-500 rounded-md">
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
          <div className="flex flex-col justify-center"></div>
          <Modal
            title="Upload Multimedia Files"
            content={
              <div className="flex justify-center">
                <Uploader />
              </div>
            }
            open="Upload File"
            save="Save"
            close="Close"
          />
          <Button title="Open Viewer" click={() => openWindow()} />
        </div>
      </div>
    </>
  );
};

export default Footer;
