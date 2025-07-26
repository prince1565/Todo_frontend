import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../config";

interface Props {
  onLogin: (token: string, userId: string, username: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Login successful
      onLogin(data.token, data.user.id, data.user.username);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card style={{ width: '100%', maxWidth: 500 }} className="shadow rounded overflow-hidden">
        <div className="text-white p-4" style={{ backgroundColor: '#9eacf7' }}>
          <h4 className="mb-0">Welcome Back!</h4>
          <small>Sign in to continue to Todo List App.</small>
        </div>
        <CardBody className="bg-white">
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
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
              Log In
            </Button>
            <div className="text-center mt-3">
              <button 
              onClick={() => navigate('/register')} // Use navigate instead of href
              className="text-muted text-decoration-none bg-transparent border-0"
              style={{ cursor: 'pointer' }}
            >
              Register new User?
            </button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;