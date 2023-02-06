import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <div>Not logged in</div>;
};

export default PrivateRoute;
