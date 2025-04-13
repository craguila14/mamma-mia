import React, { useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      console.log('Password recovery email sent to:', email);
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center">Recupera tu acceso a Mamma Mia</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustom01" className="m-3">
              <Form.Control
                required
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <a 
                href="/login" 
                className="text-primary"
                style={{ fontSize: '0.8rem', textDecoration: 'none', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </a>
              <a 
                href="/registrarse" 
                className="text-primary"
                style={{ fontSize: '0.8rem', textDecoration: 'none', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                ¿No tienes cuenta? Regístrate
              </a>
            </div>

            <Button type="submit" className="w-100 bg-info">Restablecer Contraseña</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecoverPassword;
