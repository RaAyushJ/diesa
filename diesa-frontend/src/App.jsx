// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Step 1: Import the Header
import Home from './pages/Home';
import Login from './pages/login';
import PledgePage from './pages/PledgePage';
import SelectionPage from './pages/SelectionPage';

function App() {
  return (
    <>
      <Header /> {/* Step 2: Add the Header component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pledge" element={<PledgePage />} />
        <Route path="/select" element={<SelectionPage />} />
      </Routes>
    </>
  );
}

export default App;