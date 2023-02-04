import React, { useState } from 'react';
import { useLogin } from '../queryHooks/useLogin';
import { useDataByKey } from '../queryHooks/useDataByKey';

const LoginForm = () => {
  // const [isEnable, setEnable] = useState(true);

  // const handleKeyUp = () => {
  //   if (username.length > 0 && password.length > 0) setEnable(false);
  //   else setEnable(true);
  // };

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
        // onKeyUp={handleKeyUp}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        id="password-input"
        placeholder="Password"
        // onKeyUp={handleKeyUp}
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
