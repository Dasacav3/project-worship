const Navbar = (props: Props) => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <a href="#">{props.title}</a>
        </li>
      </ul>
    </nav>
  );
};

interface Props {
  title: string;
}

export default Navbar;
