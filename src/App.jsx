import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ApplicationsPage from './pages/ApplicationsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApplicationPage from './pages/ApplicationPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route
            path="/applications"
            element={
              <PrivateRoute roles={['recruiter']}>
                <ApplicationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <PrivateRoute roles={['recruiter']}>
                <ApplicationPage />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
