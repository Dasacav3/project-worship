import 'material-icons/iconfont/material-icons.css';

const SideBar = (props: Props) => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
  return (
    <div className={sidebarClass}>
      <div className="sidebarContent">
        <nav>
          <ul className="sidebarList">
            <li className="sidebarListItem" title="Home">
              <a href="/">
                <span className="material-icons">add_home</span> Inicio
              </a>
            </li>
            <li className="sidebarListItem" title="Backgrounds">
              <a href="/backgrounds">
                <span className="material-icons">wallpaper</span> Fondos
              </a>
            </li>
            <li className="sidebarListItem" title="Songs">
              <a href="/songs">
                <span className="material-icons">library_music</span> Canciones
              </a>
            </li>
            <li className="sidebarListItem" title="Bibles">
              <a href="/bibles">
                <span className="material-icons">description</span> Biblia
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
