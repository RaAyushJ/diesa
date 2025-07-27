// src/pages/Home.jsx
import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the new CSS file

function Home() {
  const navigate = useNavigate();

  return (
    // Use the 'home-container' class for the gradient background
    <div className="home-container">
      <Container>
        {/* Use the 'home-card' class for the glass effect */}
        <Card className="home-card">
          <Card.Body>
            <h2>Welcome to Diesa 🚀</h2>
            <p>Your powerful launchpad to complete the course in <strong>30 Days!</strong></p>
            <p>Buy our Premium Plan and unlock structured learning, tracking, and certification.</p>
            {/* Use the 'home-buy-btn' class for the stylish button */}
            <Button 
              className="home-buy-btn"
              onClick={() => navigate('/buy-form')}
            >
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;