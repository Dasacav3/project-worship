import 'material-icons/iconfont/material-icons.css';
import i18n from '../store/i18n';

const SideBar = (props: Props) => {
  const sidebarTranslations : any = i18n.t('sidebar', { returnObjects: true });
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
  return (
    <div className={sidebarClass}>
      <div className="sidebarContent">
        <nav>
          <ul className="sidebarList">
            <li className="sidebarListItem" title="Home">
              <a href="/">
                <span className="material-icons">add_home</span> {sidebarTranslations.home}
              </a>
            </li>
            <li className="sidebarListItem" title="Backgrounds">
              <a href="/backgrounds">
                <span className="material-icons">wallpaper</span> {sidebarTranslations.backgrounds}
              </a>
            </li>
            <li className="sidebarListItem" title="Songs">
              <a href="/songs">
                <span className="material-icons">library_music</span> {sidebarTranslations.songs}
              </a>
            </li>
            <li className="sidebarListItem" title="Bibles">
              <a href="/bibles">
                <span className="material-icons">description</span> {sidebarTranslations.bible}
              </a>
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
