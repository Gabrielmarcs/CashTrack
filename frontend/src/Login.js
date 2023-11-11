import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        console.log('Login bem-sucedido!');
        // Redirecione o usuário para outra página ou execute a lógica desejada após o login bem-sucedido
      } else {
        console.log('Credenciais inválidas');
        // Lógica para lidar com credenciais inválidas, como exibir uma mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      // Lógica para lidar com erros, como exibir uma mensagem de erro
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

