import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  const { user, hydrated } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!user && hydrated) {
    return <Navigate to="/login" />;
  } else if (user && !roles.includes(JSON.parse(user).role)) {
    console.log(user);
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
