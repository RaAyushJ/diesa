// src/App.jsx
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import BuyForm from './pages/BuyForm';
import Checkout from './pages/Checkout';

import Dashboard from './pages/Dashboard';
import PledgePage from './pages/PledgePage';
import SelectionPage from './pages/SelectionPage';
import StartJourney from './pages/StartJourney';
import CourseDetails from './pages/CourseDetails';

import ProtectedRoute from './components/ProtectedRoute';
import LoginOnlyRoute from './components/LoginOnlyRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Login Required */}
        <Route path="/buy-form" element={
          <LoginOnlyRoute><BuyForm /></LoginOnlyRoute>
        } />
        <Route path="/checkout" element={
          <LoginOnlyRoute><Checkout /></LoginOnlyRoute>
        } />

        {/* 🔒 Full Protection */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/pledge" element={
          <ProtectedRoute><PledgePage /></ProtectedRoute>
        } />
        <Route path="/select" element={
          <ProtectedRoute><SelectionPage /></ProtectedRoute>
        } />
        <Route path="/start-journey" element={
          <ProtectedRoute><StartJourney /></ProtectedRoute>
        } />
        <Route path="/course-details" element={
          <ProtectedRoute><CourseDetails /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
