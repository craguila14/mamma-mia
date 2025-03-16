import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
const Perfil = () => {
  const { currentUser, setCurrentUser} = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: currentUser?.nombre || '',
    apellido: currentUser?.apellido || '',
    email: currentUser?.email || ''
  });
  
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (userInfo.email && userInfo.nombre && userInfo.apellido) {
      try {
        const token = Cookies.get('token')
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        console.log(token)
        const response = await axios.put('http://localhost:3000/usuario', userInfo, config);
        setCurrentUser(response.data);
        setIsEditing(false);
        alert('Perfil actualizado con éxito');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Por favor, complete todos los campos.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center">Perfil</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustom01" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={userInfo.nombre}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom02" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Apellido"
                name="apellido"
                value={userInfo.apellido}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom03" className="mb-3">
              <Form.Control
                required
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
            <Button type="submit" className="mt-3 w-100" disabled={!isEditing}>
              {isEditing ? 'Guardar cambios' : 'Editar perfil'}
            </Button>
          </Form>
          <Button 
            variant="link" 
            onClick={handleEditClick} 
            className="mt-3 w-100" 
            aria-label={isEditing ? 'Guardar' : 'Editar'}
          >
            <FaEdit size={20} /> {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Perfil;
