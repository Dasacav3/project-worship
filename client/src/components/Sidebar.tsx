import 'material-icons/iconfont/material-icons.css';
import i18n from '../store/i18n';
import { version } from '../../../package.json';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';

const SideBar = (props: Props) => {
  const sidebarTranslations: any = i18n.t('sidebar', { returnObjects: true });
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';

  const navigate = useNavigate();
  const changePage =
    (page: string): MouseEventHandler<HTMLHyperlinkElementUtils> =>
    event => {
      event.preventDefault();

      const searchParams = new URLSearchParams(`?page=${page}`);
      navigate({ search: searchParams.toString() });
    };

  return (
    <div className={sidebarClass}>
      <div className="sidebarContent">
        <nav>
          <ul className="sidebarList">
            <li className="sidebarListItem" title="Home">
              <a onClick={changePage('home')}>
                <span className="material-icons">add_home</span> {sidebarTranslations.home}
              </a>
            </li>
            <li className="sidebarListItem" title="Backgrounds">
              <a onClick={changePage('backgrounds')}>
                <span className="material-icons">wallpaper</span> {sidebarTranslations.backgrounds}
              </a>
            </li>
            <li className="sidebarListItem" title="Songs">
              <a onClick={changePage('songs')}>
                <span className="material-icons">library_music</span> {sidebarTranslations.songs}
              </a>
            </li>
            <li className="sidebarListItem" title="Bibles">
              <a onClick={changePage('bibles')}>
                <span className="material-icons">description</span> {sidebarTranslations.bible}
              </a>
            </li>
            <li className="sidebarListItem" title="Version">
              <a href="#">Version {version}</a>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={props.toggleSidebar} className="sidebar-toggle">
        {props.isOpen ? (
          <span className="material-icons">arrow_back</span>
        ) : (
          <span className="material-icons">arrow_forward</span>
        )}
      </button>
    </div>
  );
};

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default SideBar;
