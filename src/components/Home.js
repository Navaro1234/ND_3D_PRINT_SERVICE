import React from 'react';
 import Auth from './Auth';// Zorg ervoor dat het pad klopt
import '../index.css'; // Vergeet niet om een CSS-bestand toe te voegen voor styling

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>3D Print Service</h2>
        <ul>

        </ul>
      </nav>
      <h1>Welkom bij mijn 3D Print Service!</h1>
      <Auth />
      {/* Hier kun je andere componenten of inhoud toevoegen */}
      <p>Dit is de inhoud van de homepage.</p>
    </div>
  );
};

export default Home;