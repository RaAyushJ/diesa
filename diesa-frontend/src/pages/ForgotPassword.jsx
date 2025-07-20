import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to send OTP');
      } else {
        setSuccess('OTP sent to your email.');
        localStorage.setItem('resetEmail', email); // store for next step
        setTimeout(() => navigate('/verify-otp'), 2000);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow bg-dark text-white" style={{ width: '24rem' }}>
        <h4 className="mb-3 text-center">Forgot Password</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Registered Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 btn-warning">Send OTP</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
