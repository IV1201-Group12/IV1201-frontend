import { useState } from 'react';
import useAuth from '../context/AuthContext';
import { useLogin } from '../queryHooks/useLogin';
import { useLogout } from '../queryHooks/useLogout';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const logout = useLogout();
  const { user } = useAuth();

  return (
    <div>
      <label>
        Username
        <input
          type="text"
          id="username-input"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Password
        <input
          type="password"
          id="password-input"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <br />
      <button
        type="submit"
        id="button-input"
        disabled={!(username && password)}
        onClick={() => login.mutate({ username, password })}
      >
        Login
      </button>
      {/* TODO */}
      {user ? (
        <div>
          <h1>Logged in as {JSON.parse(user).username}</h1>
          <button onClick={logout.mutate}>Log Out</button>
        </div>
      ) : (
        <></>
      )}
      {login.isError || logout.isError ? <h1>{login.error.message}</h1> : <></>}
      {login.isLoading || logout.isLoading ? <h1>Loading...</h1> : <></>}
    </div>
  );
};

export default LoginForm;
