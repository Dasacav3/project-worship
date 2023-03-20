import { useState, useEffect } from 'react';
import { Range } from 'react-range';
import Button from './Button';
import Modal from './Modal';
import Uploader from './Uploader';
import i18n from '../store/i18n';

const Footer = ({ windowVisor }: any) => {
  const [marginLeft, setMarginLeft] = useState([
    localStorage.getItem('ml') ? parseInt(localStorage.getItem('ml') || '0') : 0
  ]);
  const [marginRight, setMarginRight] = useState([
    localStorage.getItem('mr') ? parseInt(localStorage.getItem('mr') || '0') : 0
  ]);
  const [marginTop, setMarginTop] = useState([
    localStorage.getItem('mt') ? parseInt(localStorage.getItem('mt') || '0') : 0
  ]);
  const [marginBottom, setMarginBottom] = useState([
    localStorage.getItem('mb') ? parseInt(localStorage.getItem('mb') || '0') : 0
  ]);
  const [fontSize, setFontSize] = useState([
    localStorage.getItem('fs') ? parseInt(localStorage.getItem('fs') || '0') : 3
  ]);

  const footerTranslations : any = i18n.t('footer', { returnObjects: true });

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
    localStorage.setItem('ml', marginLeft.toString());
  };

  const setMarginRightViewer = () => {
    windowVisor.getWinObj().postMessage({ mr: marginRight }, '*');
    localStorage.setItem('mr', marginRight.toString());
  };

  const setMarginTopViewer = () => {
    windowVisor.getWinObj().postMessage({ mt: marginTop }, '*');
    localStorage.setItem('mt', marginTop.toString());
  };

  const setMarginBottomViewer = () => {
    windowVisor.getWinObj().postMessage({ mb: marginBottom }, '*');
    localStorage.setItem('mb', marginBottom.toString());
  };

  const setFontSizeViewer = (values: number) => {
    windowVisor.getWinObj().postMessage({ fs: values }, '*');
    localStorage.setItem('fs', values.toString());
  };

  const handleBackspace = (event: any) => {
    // Check if the key pressed is the backspace key and ctrl is pressed at the same time

    if (event.keyCode === 8 && event.ctrlKey) {
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
            <label>{footerTranslations.marginLeft}</label>
            <Range
              step={0.5}
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
            <label>{footerTranslations.marginRight}</label>
            <Range
              step={0.5}
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
            <label>{footerTranslations.marginBottom}</label>
            <Range
              step={0.5}
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
            <label>{footerTranslations.marginTop}</label>
            <Range
              step={0.5}
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
            <label>{footerTranslations.fontSize}</label>
            <Range
              step={0.3}
              min={1}
              max={20}
              values={fontSize}
              onChange={values => {
                setFontSize(values);
                setFontSizeViewer(values[0]);
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
                  {footerTranslations.clean} <span className="material-icons-outlined">backspace</span>
                </>
              }
              click={() => sendMessage({ del: true }, windowVisor)}
            />
            <Modal
              title={footerTranslations.uploadFiles}
              content={
                <div className="flex justify-center">
                  <Uploader />
                </div>
              }
              open={
                <>
                  {footerTranslations.upload} <span className="material-icons-outlined">upload</span>
                </>
              }
              closeButton={true}
              saveButton={false}
              close={footerTranslations.close}
            />
            <Button
              title={
                <>
                  {footerTranslations.open} <span className="material-icons-outlined">open_in_new</span>
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
