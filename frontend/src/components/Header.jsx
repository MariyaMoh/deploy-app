import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SiteContext } from '../context/siteContext';
import { useContext } from 'react';

function Header() {
  const navigate = useNavigate();

  const { siteData, setSiteData } = useContext(SiteContext);

  const onLogout = () => {
    localStorage.removeItem('user_infov1');
    setSiteData({ ...siteData, user: null });
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">NoteSetter</Link>
      </div>
      <ul>
        {siteData.user && (
          <li>
            <Link to="/public_notes">Public Notes</Link>
          </li>
        )}

        {siteData.user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
