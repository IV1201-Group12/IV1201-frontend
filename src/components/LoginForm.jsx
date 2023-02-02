import React, { useState } from 'react';
import { useLogin } from '../queryHooks/useLogin';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEnable, setEnable] = useState(true);
  const { data, isLoading, isError, isIdle, error, refetch } = useLogin(
    username,
    password,
  );
  const handleKeyUp = () => {
    if (username.length > 0 && password.length > 0) setEnable(false);
    else setEnable(true);
  };

  return (
    <div>
      <label>User Name</label>
      <input
        type="text"
        id="username-input"
        placeholder="username"
        value={username}
        onKeyUp={handleKeyUp}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        id="password-input"
        placeholder="Password"
        onKeyUp={handleKeyUp}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />
      <button
        type="submit"
        id="button-input"
        disabled={isEnable}
        onClick={() => refetch()}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
