import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

import { environment } from '../environment';
const baseUrl = environment.baseUrl;

const Perfil = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: currentUser?.nombre || '',
    apellido: currentUser?.apellido || '',
    email: currentUser?.email || '',
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setError('');
    const token = Cookies.get('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
  
      if (userInfo.nombre && userInfo.apellido && userInfo.email) {
        const response = await axios.put(`${baseUrl}/usuario`, userInfo, config);
        setCurrentUser(response.data);
      } else {
        setError('Por favor, complete todos los campos del perfil.');
        return;
      }

      if (passwordInfo.currentPassword && passwordInfo.newPassword) {
        await axios.put(
          `${baseUrl}/usuario/password`,
          {
            currentPassword: passwordInfo.currentPassword,
            newPassword: passwordInfo.newPassword,
          },
          config
        );
      }

      setIsEditing(false);
      setPasswordInfo({ currentPassword: '', newPassword: '' }); 
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar el perfil o la contraseña.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <h3 className="text-center">Perfil</h3>
          <Form noValidate validated={validated}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={userInfo.nombre}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>
            <Form.Group controlId="formApellido" className="mt-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={userInfo.apellido}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>

            {isEditing && (
              <>
                <Form.Group controlId="formCurrentPassword" className="mt-3">
                  <Form.Label>Contraseña Actual</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordInfo.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className="mt-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}

            {!isEditing ? (
              <Button variant="primary" className="mt-3" onClick={handleEditClick}>
                Editar
              </Button>
            ) : (
              <Button variant="success" className="mt-3" onClick={handleSaveClick}>
                Guardar
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Perfil;
