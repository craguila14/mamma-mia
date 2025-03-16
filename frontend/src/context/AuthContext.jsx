import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { ENDPOINT } from '../config/constants';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      
      await axios.post('http://localhost:3000/registrarse', userData);
      return { success: true, message: 'Usuario registrado con éxito.' };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError(error.response?.data?.message || 'Error al registrar usuario.');
      return { success: false, message: 'Error al registrar usuario.' };
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser({...response.data, token});
    } catch (error) {
      console.error('Error fetching user data:', error);
      Cookies.remove('token')
      setCurrentUser(null);;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 }); // La cookie expira en 7 días
        await fetchUserData(response.data.token);
        return { success: true, message: 'Inicio de sesión exitoso.' };
      }
    } catch (error) {
      console.error('Error de login:', error);
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      registerUser,
      loginUser,
      logoutUser,
      currentUser,
      error,
      loading,
      setCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;