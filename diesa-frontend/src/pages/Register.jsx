import { useState } from 'react';
import { Container, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Registered successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
      <Card style={{ width: '26rem', backgroundColor: '#121212' }} className="p-4 shadow-lg">
        <div className="text-center mb-3">
          <Button variant="light" className="w-100 mb-2">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="G" width="20" className="me-2" />
            Sign in with Google
          </Button>
          <div className="text-muted mb-3">
            <hr /> Or <hr />
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="bg-warning-subtle"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              className="bg-warning-subtle"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="e.g. ayush@example.com"
              className="bg-dark text-white border-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!email.includes('@') && email.length > 0}
              required
            />
            {!email.includes('@') && email.length > 0 && (
              <Form.Text className="text-danger">Invalid email address</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Graduation Year</Form.Label>
            <Form.Select
              className="bg-dark text-white border-dark"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              required
            >
              <option value="">Choose Your Graduation Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                className="bg-dark text-white border-dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPass(!showPass)}
                style={{ color: 'white' }}
              >
                {showPass ? '🙈' : '👁️'}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="bg-dark text-white border-dark"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ color: 'white' }}
              >
                {showConfirm ? '🙈' : '👁️'}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100" style={{ backgroundColor: '#ff7a00', border: 'none' }}>
            Verify and Sign up
          </Button>
        </Form>

        <div className="text-center mt-3">
          Already have an account?{' '}
          <a href="/login" style={{ color: '#ff7a00' }}>
            Sign In
          </a>
        </div>
      </Card>
    </div>
  );
}

export default Register;
