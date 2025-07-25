import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return <LoginForm onLogin={onLogin} />;
};

export default LoginPage;