import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Paginas/Cadastro.jsx';
import Login from './Paginas/Login.jsx';
import DashboardReceita from './Paginas/Receitas.jsx'; // Exemplo de componente de dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/receita" element={<DashboardReceita />} />
        {/* Adicione outras rotas para os componentes de dashboard, se necessário */}
        <Route path="/" element={<Navigate to="/cadastro" />} />
        {/* Rota raiz redireciona para /cadastro */}
      </Routes>
    </Router>
  );
}

export default App;
