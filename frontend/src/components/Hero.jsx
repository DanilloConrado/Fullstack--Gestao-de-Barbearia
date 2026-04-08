import React from 'react';
import './Hero.css';
import heroImage from '../assets/hero.png';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Gerenciamento <span className="text-gradient">Absoluto</span>
        </h1>
        <p className="hero-subtitle">
          Uma plataforma unificada e focada em performance para controlar e monitorar os dados do seu sistema em tempo real.
        </p>
        <div className="hero-cta">
          <a href="#auth" className="btn btn-primary">Começar Agora</a>
          <a href="#features" className="btn btn-secondary">Saiba Mais</a>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="glow-effect"></div>
        <img src={heroImage} alt="Abstract Data Nodes" className="hero-image glass-panel" />
      </div>
    </header>
  );
}
