import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">GamerList</h1>
      <ul className="navbar-links">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/search">Search</Link></li>
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
