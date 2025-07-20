import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const email = localStorage.getItem('resetEmail');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid OTP');
      } else {
        setSuccess('OTP verified!');
        setTimeout(() => navigate('/reset-password'), 2000);
      }
    } catch (err) {
      setError('Verification failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow bg-dark text-white" style={{ width: '24rem' }}>
        <h4 className="mb-3 text-center">Verify OTP</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleVerify}>
          <Form.Group className="mb-3">
            <Form.Label>Enter OTP sent to your email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 btn-success">Verify</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default VerifyOTP;
