// src/pages/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState({ error: '', success: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically detects password recovery token from URL and sets session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setStatus({ error: 'Invalid or expired link. Please request again.', success: '' });
      }
    };
    checkSession();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus({ error: '', success: '' });

    if (password !== confirm) {
      setStatus({ error: 'Passwords do not match', success: '' });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus({ error: error.message, success: '' });
    } else {
      setStatus({ success: 'Password updated! Redirecting...', error: '' });
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow bg-dark text-white" style={{ width: '24rem' }}>
        <h4 className="mb-3 text-center">Reset Password</h4>
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success && <Alert variant="success">{status.success}</Alert>}
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
              placeholder="Re-enter password"
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
