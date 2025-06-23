import { Link } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);

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
          <div className="user-info">
            <img
              src={loggedInUser.avatar_url}
              alt={loggedInUser.username}
              width={40}
              height={40}
            />
            <span>{loggedInUser.username}</span>
          </div>
        ) : (
          <div className="spacer" />
        )}
      </div>
    </header>
  );
};

export default Header;
