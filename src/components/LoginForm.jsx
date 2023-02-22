import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../context/AuthContext';
import { useLogin } from '../queryHooks/useLogin';
import { useLogout } from '../queryHooks/useLogout';

const LoginForm = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const logout = useLogout();
  const { user } = useAuth();

  if (user) {
    return (
      <div>
        <h1 id="logged-in-message">
          {t('LoginForm.LoggedIn')} {JSON.parse(user).username}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <label>
        {t('LoginForm.Username')}
        <input
          type="text"
          id="username-input"
          placeholder={t('LoginForm.Username')}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        {t('LoginForm.Password')}
        <input
          type="password"
          id="password-input"
          placeholder={t('LoginForm.Password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <br />
      <button
        type="submit"
        id="button-input"
        onClick={() => login.mutate({ username, password })}
      >
        {t('LoginForm.LogIn')}
      </button>
      {login.isError ? (
        <h1 id="error-message">{login.error.message}</h1>
      ) : (
        <></>
      )}
      {login.isLoading || logout.isLoading ? (
        <h1 id="loading-message">{t('Loading')}</h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginForm;
