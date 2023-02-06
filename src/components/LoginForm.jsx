import React, { useState } from 'react';
import useAuth from '../context/AuthContext';
import { useLogin } from '../queryHooks/useLogin';
import { testEndpoint } from '../api/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isError, error, isLoading, mutate, isSuccess } = useLogin();
  const { user } = useAuth();

  return (
    <div>
      <label>Username</label>
      <input
        type="text"
        id="username-input"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        id="password-input"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />
      <button
        type="submit"
        id="button-input"
        disabled={!(username && password)}
        onClick={(e) => mutate({ username, password })}
      >
        Login
      </button>
      {/* TODO */}
      <h1>Logged in as {user}</h1>
      {isError ? <h1>{error.message}</h1> : <></>}
      {isLoading ? <h1>Loading...</h1> : <></>}
      <button onClick={testEndpoint}>Test</button>
    </div>
  );
};

export default LoginForm;
