// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Producten</Link></li>
        <li><Link to="/order">Bestellen</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/auth">Inloggen/Registreren</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
