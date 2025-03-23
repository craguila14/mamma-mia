import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Col, Form } from 'react-bootstrap';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const initialForm = { email: '', password: '' };

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialForm);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError('Email y contraseña son obligatorios.');
      return;
    }

    if (!emailRegex.test(credentials.email)) {
      setError('El formato del email no es correcto!');
      return;
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      const { success, message, user } = await loginUser(credentials.email, credentials.password);
      if (success) {
        alert(`Bienvenido ${user.nombre}!`);

        if (credentials.email === 'admin@gmail.com') {
          navigate('/admin'); 
        } else {
          navigate('/'); 
        }
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center">Iniciar Sesión</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustom01" className="mb-3">
              <Form.Control
                required
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom02" className="mb-3">
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            {error && (
              <>
                <div className="text-danger">{error}</div>
                <a href="/recover-password" className="d-block mt-2 text-center text-primary">
                  ¿Olvidaste tu contraseña? Recupérala aquí
                </a>
              </>
            )}

            <Button type="submit" className="mt-3 w-100">Iniciar Sesión</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
