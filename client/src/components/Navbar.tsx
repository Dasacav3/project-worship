const Navbar = (props: Props) => {
  return (
    <nav className="navbar">
      <a href="#">{props.title}</a>
    </nav>
  );
};

interface Props {
  title: string;
}

export default Navbar;
