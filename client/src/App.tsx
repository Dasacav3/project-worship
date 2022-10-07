import { Route, Routes } from 'react-router-dom';
import Backgrounds from './pages/Backgrounds';
import Bibles from './pages/Bibles';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Songs from './pages/Songs';
import './assets/main.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/bibles" element={<Bibles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
