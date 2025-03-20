import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const initialForm = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmedPassword: ''
};

const Registrarse = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [user, setUser] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validar campos vacíos
    for (const field in user) {
      if (user[field] === '') {
        setError('Por favor, complete todos los campos.');
        return;
      }
    }

    // Validar formato de email
    if (!emailRegex.test(user.email)) {
      setError('El formato del email no es correcto.');
      return;
    }

    // Validar contraseñas coincidan
    if (user.password !== user.confirmedPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      const { success, message } = await registerUser(user);
      if (success) {
        // Mostrar notificación de éxito
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario. Por favor, inténtelo de nuevo.');
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center">Registrarse</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustom01" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom02" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Apellido"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom03" className="mb-3">
              <Form.Control
                required
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom04" className="mb-3">
              <Form.Control
                required
                type="password"
                placeholder="Contraseña"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom05" className="mb-3">
              <Form.Control
                required
                type="password"
                placeholder="Confirmar Contraseña"
                name="confirmedPassword"
                value={user.confirmedPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            {error && <div className="text-danger">{error}</div>}

            <Button type="submit" className="mt-3 w-100">Registrarse</Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Registrarse;
