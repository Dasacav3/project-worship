import { Route, Routes } from 'react-router-dom';
import Backgrounds from './pages/Backgrounds';
import Bibles from './pages/Bibles';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Songs from './pages/Songs';
import './assets/main.css';
import Viewer from './components/Viewer';
import WindowVisor from './context/WindowViewer';

const App = () => {
  const windowVisor = new WindowVisor(500, 500);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backgrounds" element={<Backgrounds windowVisor={windowVisor} />} />
      <Route path="/songs" element={<Songs windowVisor={windowVisor} />} />
      <Route path="/bibles" element={<Bibles windowVisor={windowVisor} />} />
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
