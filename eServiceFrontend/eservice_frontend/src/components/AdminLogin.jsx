import React, { useState } from 'react';

function AdminLogin({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    // Perform  login logic here
    if (username === 'admin' && password === 'admin') {
      onAdminLogin(); // Notify the parent component that admin has logged in
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAdminLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
