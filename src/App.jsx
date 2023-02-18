import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationsPage from './pages/ApplicationsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApplicationPage from './pages/ApplicationPage';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useAuth from './context/AuthContext';
import { logoutUser } from './api/auth';

function App() {
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
