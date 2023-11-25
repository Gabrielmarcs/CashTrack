import React from 'react';
import './Receitas.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">__________CashTrack__________</h1>
        <div className="dashboard-actions">
          <button className="blue-button">Cadastrar</button>
          <button className="yellow-button">Alterar</button>
          <button className="red-button">Excluir</button>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-menu">
          <div className="menu-item white-button">Receita</div>
          <div className="menu-item green-button">Gasto</div>
          <div className="menu-item green-button">Fatura</div>
          <div className="menu-item red-button">Sair</div>
        </div>

        <table className="dashboard-table">
          
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
