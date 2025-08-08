import React, { useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); 

  const handleChange = (event) => {
    setEmail(event.target.value);
    setMessage({ text: '', type: '' }); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(`${baseUrl}/admin/verify-email`, { email });
        setMessage({ text: response.data.message, type: 'success' }); 
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage({ text: 'El correo no tiene una cuenta asociada', type: 'error' }); 
        } else {
          console.error('Error:', error);
          setMessage({ text: 'Ocurrió un error al procesar la solicitud', type: 'error' }); 
        }
      }
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
              {message.text && (
                <div 
                  className={`mt-2 text-${message.type === 'success' ? 'success' : 'danger'}`}
                  style={{ fontSize: '0.9rem' }}
                >
                  {message.text}
                </div>
              )}
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
