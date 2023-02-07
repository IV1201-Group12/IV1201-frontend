import React, { useState } from 'react';
import { useRegister } from '../queryHooks/useRegister';

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [pnr, setPnr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegister();

  return (
    <div>
      <label>Firstname </label>
      <input
        type="text"
        id="firstname-input"
        placeholder="Firstname"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
      />
      <br />
      <br />
      <label>Lastname </label>
      <input
        type="text"
        id="lastname-input"
        placeholder="Lastname"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
      />
      <br />
      <br />
      <label>Email </label>
      <input
        type="text"
        id="email-input"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <br />
      <label>Person Number </label>
      <input
        type="text"
        id="pnr-input"
        placeholder="Person Number"
        value={pnr}
        onChange={(event) => setPnr(event.target.value)}
      />
      <br />
      <br />
      <label>Username </label>
      <input
        type="text"
        id="username-input"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <label>Password </label>
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
        disabled={
          !(firstname && lastname && email && pnr && username && password)
        }
        onClick={(e) =>
          register.mutate({
            firstname,
            lastname,
            email,
            pnr,
            username,
            password,
          })
        }
      >
        Create Account
      </button>
    </div>
  );
};

export default RegistrationForm;
