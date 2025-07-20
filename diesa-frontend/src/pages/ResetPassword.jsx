import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to reset password');
      } else {
        setSuccess('Password reset successfully!');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow bg-dark text-white" style={{ width: '24rem' }}>
        <h4 className="mb-3 text-center">Reset Password</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleReset}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 btn-danger">Reset Password</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ResetPassword;
