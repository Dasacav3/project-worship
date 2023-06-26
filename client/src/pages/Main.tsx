import { useLocation } from 'react-router-dom';
import Bibles from './Bibles';
import Songs from './Songs';
import Backgrounds from './Backgrounds';
import Home from './Home';

const Main = ({ windowVisor }: any) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page');

  return (
    <>
      {page === 'bibles' ? <Bibles windowVisor={windowVisor} /> : ''}
      {page === 'songs' ? <Songs windowVisor={windowVisor} /> : ''}
      {page === 'backgrounds' ? <Backgrounds windowVisor={windowVisor} /> : ''}
      {page === null || page === 'home' ? <Home /> : ''}
    </>
  );
};

export default Main;
