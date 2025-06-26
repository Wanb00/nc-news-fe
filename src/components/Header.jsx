import { Link } from "react-router-dom";
import "../App.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])


  const handleLogout = () => {
    setLoggedInUser(null);
    setShowLogout(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowLogout((curr) => !curr);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="spacer" />

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/articles" className="nav-link">
            All Articles
          </Link>
          <Link to="/articles/post" className="nav-link">
            Post Article
          </Link>
          <Link to="/dev-login" className="nav-link">
            Dev Login
          </Link>
        </nav>

        {loggedInUser ? (
          <div className="user-info" ref={dropdownRef}>
            <img
              src={loggedInUser.avatar_url}
              onClick={toggleDropdown}
              alt={loggedInUser.username}
              width={40}
              height={40}
            />
            <div className="dropdown-container">
              <button
                onClick={toggleDropdown}
                className="user-toggle"
                aria-expanded={showLogout}
                aria-controls="user-menu"
              >
                {loggedInUser.username}
              </button>
              {showLogout && (
                <ul className="dropdown-menu" id="user-menu" role="menu">
                  <li role="none">
                    <Link to="/profile" className="profile-btn">
                    Profile
                    </Link>
                  </li>
                  <li role="none">
                    <button onClick={handleLogout} className="logout-btn" role="menuitem">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="spacer" />
        )}
      </div>
    </header>
  );
};

export default Header;
