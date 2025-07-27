// src/pages/SelectionPage.jsx
import { Container, Row, Col, Card } from 'react-bootstrap';

function SelectionPage() {
  return (
    <Container className="text-white text-center py-5" style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <h2 className="mb-5">How do you want to structure your grind?</h2>

      <Row className="justify-content-center g-4">
        <Col md={4}>
          <Card bg="dark" text="light" className="p-4 shadow-lg">
            <Card.Body>
              <Card.Title>Weekday Centric</Card.Title>
              <Card.Text>
                More focus on weekdays to keep weekends light.<br />
                <strong>6 tasks Mon–Fri, 3 tasks Sat–Sun</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="dark" text="light" className="p-4 shadow-lg">
            <Card.Body>
              <Card.Title>Weekend Centric</Card.Title>
              <Card.Text>
                Lighter weekdays, heavier on weekends.<br />
                <strong>4 tasks Mon–Fri, 7 tasks Sat–Sun</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SelectionPage;
