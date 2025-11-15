// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Order from './components/Order';
import Contact from './components/Contact';
import Auth from './components/Auth';
import AuthProvider from './contexts/AuthContext';
import Header from './components/Header'; // Voeg een Header component toe
import Footer from './components/Footer'; // Voeg een Footer component toe

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Header met navigatie */}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer /> {/* Footer onderaan de pagina */}
      </Router>
    </AuthProvider>
  );
};

export default App;
