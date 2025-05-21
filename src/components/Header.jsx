import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
    return (
            <header className="header">
                <nav>
                    <Link to="/" className='nav-link'>Home</Link>
                    <Link to="/articles" className="nav-link">All Articles</Link>
                </nav>
            </header>
    );
};

export default Header;