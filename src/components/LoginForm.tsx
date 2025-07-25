import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface Props {
  onLogin: () => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow bg-white rounded" style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <h4 className="mb-4">Login</h4>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormGroup>
      <Button color="primary" block type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;