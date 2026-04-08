import React, { useState } from 'react';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nome: '', email: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Processando...');
    
    // Se for apenas visual vitrine simulamos sucesso
    setTimeout(() => {
      setMsg(isLogin ? 'Login efetuado com sucesso!' : 'Usuário cadastrado com sucesso!');
      setFormData({ nome: '', email: '' });
    }, 1000);
  };

  return (
    <section id="auth" className="auth-section">
      <div className="auth-container glass-panel">
        <h2 className="auth-title">
          {isLogin ? 'Acessar API' : 'Novo Usuário'}
        </h2>
        <p className="auth-desc">Integração direta com nosso banco Prisma</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required 
                placeholder="Ex Silva" 
              />
            </div>
          )}
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              placeholder="seu@email.com" 
            />
          </div>
          
          <button type="submit" className="btn btn-primary auth-submit">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        
        {msg && <p className="auth-feedback">{msg}</p>}

        <p className="auth-toggle">
          {isLogin ? 'Não possui acesso?' : 'Já tem um cadastro?'}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-btn text-gradient">
            {isLogin ? ' Registre-se' : ' Faça Login'}
          </span>
        </p>
      </div>
    </section>
  );
}
