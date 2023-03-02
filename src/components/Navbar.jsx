/**
 * A component used to display a navbar that contains different controls depending on the
 * context of the application.
 */

import { useLogout } from '../queryHooks/useLogout';
import LanguageSwitch from './LanguageSwitch';
import useAuth from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  let activeStyle = {
    textDecoration: 'underline',
  };
  const logout = useLogout();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="Navbar">
        <div className="NavItem">
          <NavLink
            to="register"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('Navbar.Register')}
          </NavLink>
        </div>
        <div className="NavItem">
          <NavLink
            to="login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('Navbar.LogIn')}
          </NavLink>
        </div>
        <div className="NavItem">
          <LanguageSwitch />
        </div>
      </div>
    );
  }

  return (
    <div className="Navbar">
      <div className="NavItem">
        {JSON.parse(user).role === 'recruiter' ? (
          <NavLink
            to="applications"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('Navbar.Applications')}
          </NavLink>
        ) : (
          <NavLink
            to="register"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('Navbar.CreateApplication')}
          </NavLink>
        )}
      </div>
      <div className="NavItem">
        <button className="NavButton" onClick={logout.mutate}>
          {t('Navbar.LogOut')}
        </button>
      </div>
      <div className="NavItem">
        <LanguageSwitch />
      </div>
    </div>
  );
};

export default Navbar;
