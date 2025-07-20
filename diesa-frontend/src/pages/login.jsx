// src/pages/Login.jsx
import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token); // Store JWT or auth token
        navigate('/pledge'); // ✅ Go to pledge screen
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
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

          <Button variant="warning" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account? <a href="#" style={{ color: 'orange' }}>Register</a>
        </p>
      </Card>
    </div>
  );
}

export default Login;
