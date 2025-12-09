import { NavLink } from 'react-router-dom';
import { Home, Compass, Users, Map, User } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/discover", icon: Compass, label: "Discover" },
    { to: "/tribe", icon: Users, label: "Tribe" },
    { to: "/path", icon: Map, label: "Path" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="navbar">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink 
          key={to} 
          to={to} 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Icon size={24} />
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
