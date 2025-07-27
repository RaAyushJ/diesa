// src/pages/StartJourney.jsx
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function StartJourney() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the dashboard or initial course screen
    navigate('/dashboard');
  };

  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center min-vh-100">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 shadow-lg bg-secondary text-center" style={{ maxWidth: '30rem' }}>
          <Card.Body>
            <h2>You're All Set!</h2>
            <p>Let's start your 30-day challenge to become a master.</p>
            <Button variant="warning" onClick={handleStart} className="w-100 mt-3">
              Start My Journey 🚀
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default StartJourney;
