import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          NEXUS<span className="text-gradient">.RED</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">Recursos</a></li>
          <li><a href="#auth">Acesso</a></li>
        </ul>
      </div>
    </nav>
  );
}
