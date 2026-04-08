import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, PackageSearch, LogOut, Plus, Search } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('barber_activeTab') || 'clients');
  
  const switchTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('barber_activeTab', tab);
  };
  
  const userName = localStorage.getItem('barber_userName') || 'Proprietário';
  const avatarLetter = userName.charAt(0).toUpperCase();

  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', phone: '' });
  const [editingRowId, setEditingRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', phone: '' });

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', qtd: '' });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({ name: '', qtd: '' });

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.phone) return;

    try {
      const res = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });
      if (res.ok) {
        setNewClient({ name: '', phone: '' });
        fetchClients();
      }
    } catch (error) {
      console.error("Erro ao inserir", error);
    }
  };

  const handleEditSubmit = async (id) => {
    if (!editFormData.name || !editFormData.phone) return;
    try {
      const res = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        setEditingRowId(null);
        fetchClients();
      }
    } catch (error) {
      console.error("Erro ao atualizar", error);
    }
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;
    try {
      const res = await fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' });
      if (res.ok) fetchClients();
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

  const calculateStatus = (qty) => parseInt(qty) <= 4 ? 'Em Baixa' : 'Adequado';

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.qtd) return;
    try {
      const status = calculateStatus(newProduct.qtd);
      const res = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, status })
      });
      if (res.ok) {
        setNewProduct({ name: '', qtd: '' });
        fetchProducts();
      }
    } catch (error) {
      console.error("Erro ao inserir produto", error);
    }
  };

  const handleEditProductSubmit = async (id) => {
    if (!editProductData.name || !editProductData.qtd) return;
    try {
      const status = calculateStatus(editProductData.qtd);
      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editProductData, status })
      });
      if (res.ok) {
        setEditingProductId(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  const renderClients = () => (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h3>Cadastro de Clientes</h3>
        <p className="text-muted">Adicione e consulte frequentadores do Salão.</p>
      </div>

      <form className="admin-form glass-panel" onSubmit={handleAddClient}>
        <div className="form-row">
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              placeholder="Ex: Carlos Andrade"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Telefone / WhatsApp</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="submit" className="add-btn">
              <Plus size={18} /> Adicionar
            </button>
          </div>
        </div>
      </form>

      <div className="data-table-container glass-panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center' }}>Nenhum cliente cadastrado.</td></tr>}
            {clients.map(c => {
              if (editingRowId === c.id) {
                return (
                  <tr key={c.id}>
                    <td>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--primary-red)', background: 'transparent', color: '#fff' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--primary-red)', background: 'transparent', color: '#fff' }}
                      />
                    </td>
                    <td>
                      <button className="btn-link" onClick={() => handleEditSubmit(c.id)} style={{ color: '#2ecc71' }}>Salvar</button>
                      <button className="btn-link" onClick={() => setEditingRowId(null)} style={{ color: '#95a5a6', marginLeft: '1rem' }}>Cancelar</button>
                    </td>
                  </tr>
                )
              }
              return (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button className="btn-link" onClick={() => {
                      setEditingRowId(c.id);
                      setEditFormData({ name: c.name, phone: c.phone });
                    }}>Editar</button>
                    <button className="btn-link" onClick={() => handleDeleteClient(c.id)} style={{ color: '#ff4d4d', marginLeft: '1rem' }}>Excluir</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStock = () => (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h3>Controle de Estoque</h3>
        <p className="text-muted">Gerenciamento de produtos, pomadas e acessórios.</p>
      </div>

      <form className="admin-form glass-panel" onSubmit={handleAddProduct}>
        <div className="form-row">
          <div className="form-group">
            <label>Nome do Produto</label>
            <input
              type="text"
              placeholder="Ex: Pomada Modeladora"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Quantidade Entrante</label>
            <input
              type="number"
              placeholder="Ex: 10"
              min="0"
              value={newProduct.qtd}
              onChange={(e) => setNewProduct({ ...newProduct, qtd: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="submit" className="add-btn">
              <Plus size={18} /> Adicionar
            </button>
          </div>
        </div>
      </form>

      <div className="data-table-container glass-panel mt-4">
        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum produto cadastrado.</td></tr>}
            {products.map(p => {
              if (editingProductId === p.id) {
                return (
                  <tr key={p.id}>
                    <td>
                      <input
                        type="text"
                        value={editProductData.name}
                        onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--primary-red)', background: 'transparent', color: '#fff' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={editProductData.qtd}
                        onChange={(e) => setEditProductData({ ...editProductData, qtd: e.target.value })}
                        style={{ width: '90px', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--primary-red)', background: 'transparent', color: '#fff' }}
                      />
                    </td>
                    <td>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>Autocalculado</span>
                    </td>
                    <td>
                      <button className="btn-link" onClick={() => handleEditProductSubmit(p.id)} style={{ color: '#2ecc71' }}>Salvar</button>
                      <button className="btn-link" onClick={() => setEditingProductId(null)} style={{ color: '#95a5a6', marginLeft: '1rem' }}>Cancelar</button>
                    </td>
                  </tr>
                )
              }
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><span className="stock-qtd">{p.qtd}</span></td>
                  <td>
                    <span className={`status-badge ${p.status === 'Em Baixa' ? 'alert' : 'ok'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-link" onClick={() => {
                      setEditingProductId(p.id);
                      setEditProductData({ name: p.name, qtd: p.qtd });
                    }}>Editar</button>
                    <button className="btn-link" onClick={() => handleDeleteProduct(p.id)} style={{ color: '#ff4d4d', marginLeft: '1rem' }}>Excluir</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <aside className="sidebar glass-panel">
        <div className="sidebar-brand">
          <h2 className="text-gradient">Área do Proprietário</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => switchTab('clients')}
          >
            <Users size={20} />
            <span>Gestão de Clientes</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'stock' ? 'active' : ''}`}
            onClick={() => switchTab('stock')}
          >
            <PackageSearch size={20} />
            <span>Estoque e Produtos</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={() => {
            localStorage.removeItem('barber_userName');
            navigate('/login');
          }}>
            <LogOut size={20} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1 className="page-title">
            {activeTab === 'clients' ? 'Clientes' : 'Estoque'}
          </h1>
          <div className="header-actions">
            {/* BOTAO DE BUSCA

            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Buscar..." />
            </div>
            
            */}
            <div className="user-profile">
              <div className="avatar">{avatarLetter}</div>
              <span>{userName}</span>
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'clients' && renderClients()}
          {activeTab === 'stock' && renderStock()}
        </div>
      </main>
    </div>
  );
}
