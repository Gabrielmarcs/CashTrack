// import React, { useState } from 'react';

// const TelaLogin = () => {
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Aqui você pode adicionar a lógica para autenticar o usuário
//     console.log(email, senha);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <div style={{ flex: 1, backgroundColor: 'lightgreen', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <h1 style={{ color: 'white', fontSize: '3em' }}>$$$$CashTrack$$$$</h1>
//       </div>
//       <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ marginBottom: '1em', padding: '1em', borderRadius: '5px', border: '1px solid lightgreen' }}
//         />
//         <input
//           type="password"
//           placeholder="Senha"
//           value={senha}
//           onChange={(e) => setSenha(e.target.value)}
//           style={{ marginBottom: '1em', padding: '1em', borderRadius: '5px', border: '1px solid lightgreen' }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{ padding: '1em', borderRadius: '5px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TelaLogin;

import React, { useState } from 'react';

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
    console.log(email, senha);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'white' }}>
      <h1 style={{ color: '#4D9554', fontFamily: 'Outfit', fontSize: '3em' }}>$$CashTrack$$</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '1em', padding: '1em', borderRadius: '5px', border: '1px solid #6ED131' }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ marginBottom: '1em', padding: '1em', borderRadius: '5px', border: '1px solid #6ED131' }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: '1em', borderRadius: '5px', backgroundColor: '#6ED131', color: 'white', fontWeight: 'bold', fontFamily: 'Outfit' }}
      >
        Entrar
      </button>
    </div>
  );
};

export default TelaLogin;
