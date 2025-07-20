// src/pages/PledgePage.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PledgePage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // This is the corrected line
    navigate('/select');
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      <h1 className="mb-4 text-center">"This is your time. Own it. Conquer your 30-day goal."</h1>
      <p className="lead text-center">I pledge to stay committed and focused to complete my goal in the next 30 days.</p>
      <Button className="mt-4" variant="light" onClick={handleContinue}>Continue</Button>
    </Container>
  );
}

export default PledgePage;