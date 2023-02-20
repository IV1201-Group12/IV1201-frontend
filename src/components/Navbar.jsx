import { useLogout } from '../queryHooks/useLogout';
import useAuth from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
            Register
          </NavLink>
        </div>
        <div className="NavItem">
          <NavLink
            to="login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
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
            Applications
          </NavLink>
        ) : (
          <NavLink
            to="createApplication"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Create Application
          </NavLink>
        )}
      </div>
      <div className="NavItem">
        <button className="NavButton" onClick={logout.mutate}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
