import { useState } from 'react';
import { useLogin } from '../queryHooks/useLogin';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);

  const submit = async () => {
    const credentials = {
      username,
      password,
    };
    console.log(credentials);
    const response = await useLogin(credentials);
    setResponseStatus(response.status);
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'username') {
      setUsername(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      <div>{responseStatus}</div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
      </form>
      <button type="button" onClick={submit}>
        Login
      </button>
    </div>
  );
}
