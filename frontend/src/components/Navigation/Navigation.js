import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <HomeIcon className="nav-icon" />
        <span>Tasks</span>
      </Link>
      <Link to="/stats" className={`nav-item ${location.pathname === '/stats' ? 'active' : ''}`}>
        <ChartBarIcon className="nav-icon" />
        <span>Stats</span>
      </Link>
    </nav>
  );
};

export default Navigation; 