import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  const { user, role, hydrated } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  console.log(user, role, hydrated);
  if (!user && hydrated) {
    return <Navigate to="/login" />;
  } else if (!roles.includes(role)) {
    return (
      <div>
        <h1>Authorization denied</h1>
        <p>You do not have the required role for this page</p>
        <button onClick={goBack}>Go back</button>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
