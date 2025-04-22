import { reservasModel } from "../models/reservasModel.js";

const crearReserva = async (req, res) => {
    try {
        const usuario_id = req.user.id
        const nuevaReserva = await reservasModel.crearReserva({ ...req.body, usuario_id });
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

const obtenerReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.obtenerReservas();
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

const obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await reservasModel.obtenerReservaPorId(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        console.error('Error al obtener la reserva:', error);
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

const actualizarReservaAdmin = async (req, res) => {
    try {
        const reservaActualizada = await reservasModel.actualizarReservaAdmin(req.params.id, req.body.estado);
        if (!reservaActualizada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reservaActualizada);
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

const actualizarReservaUsuario = async (req, res) => {
    try {
        const reservaActualizada = await reservasModel.actualizarReservaUsuario(req.params.id, req.body);
        if (!reservaActualizada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reservaActualizada);
    } catch (error) {
        console.error('Error al actualizar la reserva del usuario:', error);
        res.status(500).json({ error: 'Error al actualizar la reserva del usuario' });
    }
};

const eliminarReserva = async (req, res) => {
    try {
        await reservasModel.eliminarReserva(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};

const obtenerReservasPorUsuario = async (req, res) => {
    try {
        const usuario_id = req.user.id; // Obtener el usuario_id del token
        const reservas = await reservasModel.obtenerReservasPorUsuario(usuario_id);
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
    }
};

export const reservasController = {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReservaAdmin,
    actualizarReservaUsuario,
    eliminarReserva,
    obtenerReservasPorUsuario,
};
