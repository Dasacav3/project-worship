import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import './assets/index.css';
import './assets/tailwind.js';
import Viewer from './components/Viewer';
import WindowVisor from './context/WindowViewer';
import Main from './pages/Main';

const App = () => {
  const windowVisor = new WindowVisor(500, 500);

  return (
    <Routes>
      <Route path="/" element={<Main windowVisor={windowVisor} />} />
      <Route
        path="/viewer"
        element={
          <Viewer
            defaultUrlFile={localStorage.getItem('urlFile')}
            defaultFileType={localStorage.getItem('fileType')}
            defaultTextContent={localStorage.getItem('textContent')}
            defaultActiveInfo={localStorage.getItem('activeInfo')}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
