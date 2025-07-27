import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // ✅ User is signed in
      navigate('/pledge');
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <Card style={{ width: '24rem', backgroundColor: '#1e1e1e' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/forgot-password" style={{ color: 'orange' }}>
              Forgot Password?
            </Link>
          </div>

          <Button variant="warning" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'orange' }}>
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;