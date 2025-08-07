import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

const ReservaUsuario = () => {
    const { currentUser } = useAuth();
    const [reserva, setReserva] = useState({
        fecha: '',
        hora: '',
        personas: '',
        telefono: '',
        mensaje: '',
        nombre: '',
        apellido: '',
    });
    const [reservas, setReservas] = useState([]);
    const [reservaId, setReservaId] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setReserva((prev) => ({
                ...prev,
                nombre: currentUser.nombre || '',
                apellido: currentUser.apellido || ''
            }));
            fetchReservas();
        }
    }, [currentUser]);

    const fetchReservas = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('No se encontró un token de autenticación. Por favor, inicia sesión.');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:3000/reservas/usuario', config); 
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            if (error.code === 'ERR_NETWORK') {
                alert('Error de red: No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.');
            } else {
                alert('Error al obtener las reservas');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva({ ...reserva, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('No se encontró un token de autenticación. Por favor, inicia sesión.');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('http://localhost:3000/reservas', reserva, config);
            setReservaId(response.data.id);
            fetchReservas(); 
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Error al crear la reserva');
        }
    };

    const handleEdit = (reserva) => {
        setReserva({
            nombre: reserva.nombre,
            apellido: reserva.apellido,
            fecha: reserva.fecha,
            hora: reserva.hora,
            personas: reserva.personas,
            telefono: reserva.telefono,
            mensaje: reserva.mensaje,
        });
        setReservaId(reserva.id); 
    };

    const handleUpdate = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('No se encontró un token de autenticación. Por favor, inicia sesión.');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:3000/update-reserva/${reservaId}`, reserva, config);
            setReservaId(null); 
            setReserva({
                nombre: '',
                apellido: '',
                fecha: '',
                hora: '',
                personas: '',
                telefono: '',
                mensaje: '',
            }); 
            fetchReservas(); 
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            alert('Error al actualizar la reserva');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('No se encontró un token de autenticación. Por favor, inicia sesión.');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://localhost:3000/delete-reserva/${id}`, config);
            fetchReservas(); 
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            alert('Error al eliminar la reserva');
        }
    };

    return (
        <div style={{ padding: '2rem', marginTop: '56px' }}>
            <h2>Crear Reserva</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={reserva.nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={reserva.apellido}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        value={reserva.fecha}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hora</label>
                    <select
                        name="hora"
                        value={reserva.hora}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccione una hora</option>
                        {Array.from({ length: 17 }, (_, i) => {
                            const hour = 15 + Math.floor(i / 2);
                            const minutes = i % 2 === 0 ? '00' : '30';
                            const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
                            return <option key={time} value={time}>{time}</option>;
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Personas</label>
                    <input
                        type="number"
                        name="personas"
                        value={reserva.personas}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={reserva.telefono}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mensaje</label>
                    <textarea
                        name="mensaje"
                        value={reserva.mensaje}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Crear Reserva
                </button>
                {reservaId && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleUpdate}
                        style={{ marginTop: '1rem', marginLeft: '1rem' }}
                    >
                        Actualizar Reserva
                    </button>
                )}
            </form>

            <h2 style={{ marginTop: '2rem' }}>Mis Reservas</h2>
            <table className="table" style={{ marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Personas</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.nombre}</td>
                            <td>{reserva.apellido}</td>
                            <td>
                                {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </td> 
                            <td>{reserva.hora.slice(0, 5)}</td>
                            <td>{reserva.personas}</td>
                            <td>{reserva.telefono}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEdit(reserva)}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(reserva.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservaUsuario;
