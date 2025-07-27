// src/pages/CourseDetails.jsx
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <Container className="d-flex justify-content-center">
        <Card className="p-4 bg-secondary shadow-lg" style={{ width: '32rem' }}>
          <h3 className="text-center mb-3">Course Details</h3>
          <p>
            Our 30-Day Challenge includes structured learning paths, problem-solving,
            and real-world coding projects tailored to your academic year.
          </p>
          <ul>
            <li>📘 Daily curated content</li>
            <li>🧠 Brainstorming tasks and quizzes</li>
            <li>🗂️ Personalized Dashboard</li>
            <li>🎓 Certification upon completion</li>
          </ul>

          <Button variant="warning" className="w-100 mt-3" onClick={handleProceed}>
            Proceed to Payment
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default CourseDetails;