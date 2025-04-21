import pool from '../config/db.js'

const crearReserva = async (reserva) => {
    const { usuario_id, fecha, hora, personas, telefono, mensaje } = reserva;
    const query = `
        INSERT INTO reservas (usuario_id, fecha, hora, personas, telefono, mensaje)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [usuario_id, fecha, hora, personas, telefono, mensaje];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const obtenerReservas = async () => {
    const query = 'SELECT * FROM reservas ORDER BY creado_en DESC;';
    const result = await pool.query(query);
    return result.rows;
};

const obtenerReservaPorId = async (id) => {
    const query = 'SELECT * FROM reservas WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const actualizarReservaAdmin = async (id, estado) => {
    const query = `
        UPDATE reservas
        SET estado = $1
        WHERE id = $2
        RETURNING *;
    `;
    const result = await pool.query(query, [estado, id]);
    return result.rows[0];
};

const actualizarReservaUsuario = async (id, { fecha, hora, personas, telefono, mensaje }) => {
    const query = `
        UPDATE reservas
        SET fecha = $1, hora = $2, personas = $3, telefono = $4, mensaje = $5
        WHERE id = $6
        RETURNING *;
    `;
    const values = [fecha, hora, personas, telefono, mensaje, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const eliminarReserva = async (id) => {
    const query = 'DELETE FROM reservas WHERE id = $1;';
    await pool.query(query, [id]);
};

export const reservasModel = {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReservaAdmin,
    actualizarReservaUsuario,
    eliminarReserva,
};
