import React, { useState } from 'react';
import { useLogin } from '../queryHooks/useLogin';
import { useDataByKey } from '../queryHooks/useDataByKey';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isError, error, isLoading, mutate, isSuccess } = useLogin();
  const name = useDataByKey(['user']);

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
      {isSuccess ? <h1>Logged in as {name}</h1> : <></>}
      {isError ? <h1>{error.message}</h1> : <></>}
      {isLoading ? <h1>Loading...</h1> : <></>}
    </div>
  );
};

export default LoginForm;
