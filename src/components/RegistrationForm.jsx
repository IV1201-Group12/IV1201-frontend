import { useState } from 'react';

import { useRegister } from '../queryHooks/useRegister';

export default function RegistrationForm() {
  const { isError, error, isLoading, mutate, isSuccess } = useRegister();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [pnr, setPnr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const applicant = {
      firstname,
      lastname,
      email,
      pnr,
      username,
      password,
      role: 'applicant',
    };
    mutate(applicant);
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'firstname') {
      setFirstname(value);
    }

    if (name === 'lastname') {
      setLastname(value);
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
      {isLoading ? <h1>Loading...</h1> : null}
      {isSuccess ? (
        <h1 style={{ color: 'green' }}>New account created</h1>
      ) : null}
      {isError ? (
        <h1 style={{ color: 'red' }}>{error.response.data} </h1>
      ) : null}
      <form>
        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={firstname}
          onChange={onChange}
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={lastname}
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
          placeholder="YYYYMMDDXXXX"
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
      <button
        type="button"
        id="button-input"
        disabled={
          !(firstname && lastname && email && pnr && username && password)
        }
        onClick={submit}
      >
        Create account
      </button>
    </div>
  );
}
