import Logo from './Logo';
import Navbar from './Navbar';

const Header = (props: Props) => {
  return (
    <header>
      <div className="h-container">
        <Logo />
        <Navbar title={props.title} />
      </div>
    </header>
  );
};

interface Props {
  title: string;
}

export default Header;
