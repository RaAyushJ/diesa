// src/components/FeatureCard.jsx
import { Card } from 'react-bootstrap';

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="text-white bg-secondary shadow-sm mb-3" style={{ width: '100%' }}>
      <Card.Body className="d-flex align-items-start">
        <div className="me-3 fs-3">{icon}</div>
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;