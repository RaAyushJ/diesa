// src/pages/PledgePage.jsx
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function PledgePage() {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate('/dashboard'); // ✅ Proceed to main app
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <Card className="p-5 bg-secondary shadow" style={{ width: '34rem' }}>
        <h3 className="text-center mb-4">🚀 The 30-Day Challenge</h3>
        <p>
          By clicking "I Agree", you pledge to:
        </p>
        <ul>
          <li>Practice daily for the next 30 days</li>
          <li>Stay committed and track your progress</li>
          <li>Complete the syllabus honestly</li>
        </ul>
        <p className="text-center mt-4">Let's do this together 💪</p>
        <Button variant="warning" className="w-100 mt-3" onClick={handleAgree}>
          I Agree & Begin
        </Button>
      </Card>
    </div>
  );
}

export default PledgePage;