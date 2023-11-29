import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Paginas/Cadastro.jsx';
import Login from './Paginas/Login.jsx';
import DashboardReceita from './Paginas/Receitas.jsx'; // Exemplo de componente de dashboard
import DashboardGasto from './Paginas/Gastos.jsx';
import DashboardFatura from './Paginas/Faturas.jsx'
import DashboardCategoria from './Paginas/Categoria.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/receitas" element={<DashboardReceita />} />
        <Route path="/dashboard/gastos" element={<DashboardGasto />} />
        <Route path="/dashboard/faturas" element={<DashboardFatura />} />
        <Route path="/dashboard/categorias" element={<DashboardCategoria />} />
        {/* Adicione outras rotas para os componentes de dashboard, se necessário */}
        <Route path="/" element={<Navigate to="/cadastro" />} />
        {/* Rota raiz redireciona para /cadastro */}
      </Routes>
    </Router>
    
  );
}

export default App;
