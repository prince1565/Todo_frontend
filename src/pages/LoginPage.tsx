import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = (token: string, userId: string, username: string) => {
    login(token, userId, username);
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;