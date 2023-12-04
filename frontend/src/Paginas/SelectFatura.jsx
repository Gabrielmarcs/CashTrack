import React, { useState, useEffect } from 'react';

const SelectFatura = ({ onFaturaChange }) => {
  const [faturas, setFaturas] = useState([]);
  const [faturaSelecionada, setFaturaSelecionada] = useState('');

  useEffect(() => {
    // Função para buscar as faturas do backend ao carregar a página
    const fetchFaturas = async () => {
      try {
        const response = await fetch('http://localhost:8080/fatura/listar');
        const data = await response.json();
        setFaturas(data);
      } catch (error) {
        console.error('Erro ao buscar faturas:', error);
      }
    };

    fetchFaturas();
  }, []);

  const handleFaturaChange = (event) => {
    const faturaId = event.target.value;
    setFaturaSelecionada(faturaId);
    onFaturaChange(faturaId);
  };

  return (
    <div>
      <label htmlFor="faturas">Escolha uma fatura:</label>
      <select
        id="faturas"
        name="faturas"
        value={faturaSelecionada}
        onChange={handleFaturaChange}
      >
        <option value="">Selecione uma fatura</option>
        {faturas.map((fatura) => (
          <option key={fatura.id} value={fatura.id}>
            {fatura.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFatura;
