import { Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  //TODO redirect with <Navigate to="/login">? Renders before hydration from localstorage atm, defeating purpose
  return user ? children : <div>Not logged in</div>;
};

export default PrivateRoute;
