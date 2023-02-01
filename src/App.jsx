import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ApplicationsPage from './pages/ApplicationsPage';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
