import { useDataByKey } from '../queryHooks/useDataByKey';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuth = useDataByKey(['user']);
  return isAuth ? children : <Navigate to={'/login'} />;
};

export default PrivateRoute;
