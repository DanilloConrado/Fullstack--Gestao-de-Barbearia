import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import './Login.css';
import ScissorsIntro from '../components/ScissorsIntro';

export default function Login() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nome: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const url = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/usuarios';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.nome, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('barber_userName', data.user.name);
        setLoading(false);
        navigate('/dashboard');
      } else {
        setLoading(false);
        setErrorMsg(data.error || 'Erro na comunicação');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Servidor offline. Inicie o backend.');
    }
  };

  return (
    <>
      {showIntro && <ScissorsIntro onComplete={() => setShowIntro(false)} />}
      <div className="login-wrapper">
        <div className="login-card glass-panel">
          <div className="login-header">
            <Scissors size={48} className="brand-logo text-gradient" color="#ff4d4d" />
            <h2>Gestão <span className="text-gradient">Barber</span></h2>
            <p>{isLogin ? 'Acesse o painel do proprietário' : 'Crie sua conta administrativa'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="input-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Danillo Conrado"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>
            )}
            <div className="input-group">
              <label>E-mail do Proprietário</label>
              <input 
                type="email" 
                required 
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {errorMsg && <p style={{color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center'}}>{errorMsg}</p>}

            <button type="submit" className="login-btn">
              {loading ? 'Aguarde...' : (isLogin ? 'Acessar' : 'Criar Conta')}
            </button>
          </form>

          <p className="auth-toggle">
            {isLogin ? 'Ainda não é cadastrado?' : 'Já possui acesso?'}
            <span onClick={() => setIsLogin(!isLogin)} className="toggle-btn text-gradient">
              {isLogin ? ' Crie uma conta' : ' Faça Login'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
