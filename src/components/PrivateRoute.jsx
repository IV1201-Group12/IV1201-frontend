import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, hydrated } = useAuth();
  if (!user && hydrated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
