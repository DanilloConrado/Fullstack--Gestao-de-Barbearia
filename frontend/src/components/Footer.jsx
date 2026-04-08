import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255, 51, 51, 0.1)', marginTop: '4rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} NEXUS RED. Todos os direitos reservados.
      </p>
    </footer>
  );
}
