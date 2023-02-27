//React
import { useEffect } from 'react';
//External packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslation } from 'react-i18next';
//Route level components
import ApplicationsPage from './pages/ApplicationsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApplicationPage from './pages/ApplicationPage';
import LandingPage from './pages/LandingPage';
//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
//Context
import useAuth from './context/AuthContext';
//API
import { logoutUser } from './api/auth';
function App() {
  //Sets the global behaviour on an error response with a status of 401, logging out the user.
  const { removeCurrentUser } = useAuth();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: async (error) => {
        if (error?.response?.status === 401) {
          removeCurrentUser();
          await logoutUser();
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
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
        </div>
        <Footer />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
