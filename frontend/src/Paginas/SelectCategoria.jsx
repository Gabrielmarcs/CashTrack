import React, { useState, useEffect } from 'react';

const SelectCategoria = () => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  
    useEffect(() => {
      // Faz uma chamada de API para buscar a lista de categorias do backend
      fetch('http://seu-backend/api/categorias')
        .then((response) => response.json())
        .then((data) => setCategorias(data))
        .catch((error) => console.error('Erro ao buscar categorias:', error));
    }, []);
  
    const handleCategoriaChange = (event) => {
      setCategoriaSelecionada(event.target.value);
    };
  
    return (
      <div>
        <label htmlFor="categorias">Escolha uma categoria:</label>
        <select
          id="categorias"
          name="categorias"
          value={categoriaSelecionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default SelectCategoria;