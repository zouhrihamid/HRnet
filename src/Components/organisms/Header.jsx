import { Link } from 'react-router-dom';
import Logo from '../../assets/Hrnet-logo.jpg';
import '../../styles/Header.css';

const Header = () => {
      return (
            <header className="main-nav">
                  <Link to="/">
                        <img className="main-nav-logo" src={Logo} alt="HRnet logo" />
                  </Link>
                  <nav className="main-nav-items">
                        <ul>
                              <li>
                                    <Link to="/" className="main-nav-item">
                                          Home
                                    </Link>
                              </li>
                              <li>
                                    <Link to="/employees" className="main-nav-item">
                                          Employees
                                    </Link>
                              </li>
                        </ul>
                  </nav>
            </header>
      );
};

export default Header;
