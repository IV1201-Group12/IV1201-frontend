/**
 * A component that is used to wrap other components to make them private, meaning they
 * can't be accessed without the authorization. Either redirects unaothorized access or
 * displays an unauthorized message page.
 */

import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  const { t } = useTranslation();
  const { user, hydrated } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  if (!user && hydrated) {
    return <Navigate to="/login" />;
  } else if (user && !roles.includes(JSON.parse(user).role)) {
    return (
      <div>
        <h1>{t('PrivateRoute.DeniedHeader')}</h1>
        <p>{t('PrivateRoute.DeniedBody')}</p>
        <button onClick={goBack}>{t('PrivateRoute.GoBack')}</button>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
