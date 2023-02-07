import { useState } from 'react';

//import { useCreateAccount } from '../queryHooks/useCreateAccount';
import { signUpUser } from '../api/auth';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [pnr, setPnr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);

  const submit = async () => {
    const applicant = {
      name,
      surname,
      email,
      pnr,
      username,
      password,
      role_id: 2,
    };
    const response = await signUpUser(applicant);
    setResponseStatus(response.status);
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'surname') {
      setSurname(value);
    }

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'pnr') {
      setPnr(value);
    }

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
        <label htmlFor="name">First Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="surname">Last Name</label>
        <input
          id="surname"
          name="surname"
          type="text"
          value={surname}
          onChange={onChange}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="pnr">Person Number</label>
        <input
          id="pnr"
          name="pnr"
          type="number"
          value={pnr}
          onChange={onChange}
        />
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
        Create account
      </button>
    </div>
  );
}
