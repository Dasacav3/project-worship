import 'material-icons/iconfont/material-icons.css';

const SideBar = (props: Props) => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
  return (
    <div className={sidebarClass}>
      <div className="sidebarContent">
        <nav>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <a href="/">
                <span className="material-icons">add_home</span> Inicio
              </a>
            </li>
            <li className="sidebarListItem">
              <a href="/backgrounds">
                <span className="material-icons">wallpaper</span> Fondos
              </a>
            </li>
            <li className="sidebarListItem">
              <a href="/songs">
                <span className="material-icons">library_music</span> Canciones
              </a>
            </li>
            <li className="sidebarListItem">
              <a href="/bibles">
                <span className="material-icons">description</span> Biblia
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={props.toggleSidebar} className="sidebar-toggle">
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
  );
};

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default SideBar;
