// src/components/LoginPage.js
import React from 'react';

function LoginPage() {
  return (
    <div>
      <h2>Login to Otto's Kitchen</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

