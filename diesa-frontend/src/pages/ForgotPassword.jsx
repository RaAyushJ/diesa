// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ error: '', success: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: '', success: '' });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password' // Change to your deployed frontend
    });

    if (error) {
      setStatus({ error: error.message, success: '' });
    } else {
      setStatus({ success: 'Password reset link sent to your email!', error: '' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow bg-dark text-white" style={{ width: '24rem' }}>
        <h4 className="mb-3 text-center">Forgot Password</h4>
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success && <Alert variant="success">{status.success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 btn-warning">Send Reset Link</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ForgotPassword;