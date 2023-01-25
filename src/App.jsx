import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ThingsPage from './pages/ThingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/things" element={<ThingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
