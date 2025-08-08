import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { environment } from '../../environment';
const baseUrl = environment.baseUrl;

const AdminReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [estado, setEstado] = useState('');
    const [selectedReservaId, setSelectedReservaId] = useState(null);

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${baseUrl}/admin/reservas`, config);
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
            alert('Error al obtener las reservas');
        }
    };

    const handleUpdate = async (id) => {
        try {
            const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`${baseUrl}/admin/update-reservas/${id}`, { estado }, config);
            setEstado('');
            setSelectedReservaId(null);
            fetchReservas();
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            alert('Error al actualizar la reserva');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${baseUrl}/admin/delete-reserva/${id}`, config);
            fetchReservas();
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            alert('Error al eliminar la reserva');
        }
    };

    return (
        <div style={{ padding: '2rem', marginTop: '56px' }}>
            <h2>Administrar Reservas</h2>
            <table className="table" style={{ marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Personas</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.nombre}</td>
                            <td>{reserva.apellido}</td>
                            <td>{new Date(reserva.fecha).toLocaleDateString('es-ES')}</td>
                            <td>{reserva.hora.slice(0, 5)}</td>
                            <td>{reserva.personas}</td>
                            <td>{reserva.telefono}</td>
                            <td>
                                {selectedReservaId === reserva.id ? (
                                    <select
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="confirmada">confirmada</option>
                                        <option value="finalizada">finalizada</option>
                                        <option value="cancelada">cancelada</option>
                                    </select>
                                ) : (
                                    reserva.estado
                                )}
                            </td>
                            <td>
                                {selectedReservaId === reserva.id ? (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleUpdate(reserva.id)}
                                        style={{ marginRight: '0.5rem' }}
                                    >
                                        Guardar
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => setSelectedReservaId(reserva.id)}
                                        style={{ marginRight: '0.5rem' }}
                                    >
                                        Actualizar
                                    </button>
                                )}
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

export default AdminReservas;
