import React from 'react';
import './Features.css';

export default function Features() {
  const cards = [
    {
      title: 'Alta Performance',
      desc: 'Infraestrutura Otimizada para gerenciar seus dados com velocidade incrível e sem travamentos.',
      icon: '⚡'
    },
    {
      title: 'Controle de Usuários',
      desc: 'Módulo completo de CRUD para os seus usuários. Seguro, estável e conectado ao banco de dados Prisma.',
      icon: '👥'
    },
    {
      title: 'Segurança Máxima',
      desc: 'Seus dados e de seus clientes protegidos. Arquitetura em nuvem e painel de controle.',
      icon: '🛡️'
    }
  ];

  return (
    <section id="features" className="features">
      <h2 className="section-title">Nossos <span className="text-gradient">Recursos</span></h2>
      <div className="features-grid">
        {cards.map((card, index) => (
          <div className="feature-card glass-panel" key={index}>
            <div className="icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
