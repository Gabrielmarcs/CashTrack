import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Paginas/Cadastro.jsx';
import Login from './Paginas/Login.jsx';
import Receita from './Paginas/Receitas.jsx';

function App() {
  return (
    <Router>
       <Routes>
         
         <Route path="/login" element={<Login />} />
         <Route path="/cadastro" element={<Cadastro />} />
         <Route path="/receita" element={<Receita />} />
         <Route path="/" element={<Navigate to="/login" />} />

       </Routes>
    </Router>
    //<DashboardCategoria />
  );
}

export default App;
