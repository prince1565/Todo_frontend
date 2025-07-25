import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from 'reactstrap';

interface Props {
  onRegister: () => void;
}

const RegisterForm: React.FC<Props> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful
      onRegister();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card style={{ width: '100%', maxWidth: 500 }} className="shadow rounded overflow-hidden">
        <div className="text-white p-4" style={{ backgroundColor: '#9eacf7' }}>
          <h4 className="mb-0">Create Account</h4>
          <small>Register to access Todo List App.</small>
        </div>
        <CardBody className="bg-white">
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username" className="fw-bold">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className="fw-bold">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="fw-bold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </FormGroup>
            <Button style={{ backgroundColor: '#455ff3ff', borderColor: '#9eacf7' }} block type="submit" className="fw-bold">
              Register
            </Button>
            <div className="text-center mt-3">
              <button 
              onClick={() => navigate('/login')} // 3. Use navigate instead of href
              className="text-muted text-decoration-none bg-transparent border-0 p-0"
              style={{ cursor: 'pointer' }}
              aria-label="Navigate to login page"
            >
              Already have an account? Login
            </button>

            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;