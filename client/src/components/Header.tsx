import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <div className="h-container">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
