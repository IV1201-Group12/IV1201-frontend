import { Navigate } from 'react-router-dom';
import ListOfApplications from '../components/ListOfApplications';
import useAuth from '../context/AuthContext';

const ApplicationsPage = () => {
  return <ListOfApplications />;
};

export default ApplicationsPage;
