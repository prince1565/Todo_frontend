import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/login'); // Redirect to login after successful registration
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default RegisterPage;