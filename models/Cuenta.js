// models/Cuenta.js
const pool = require('../utils/db'); // Asegúrate de configurar y exportar un pool de conexiones PostgreSQL desde un archivo separado, por ejemplo, `db.js`.

class Cuenta {
    // Obtener todas las cuentas
    static async obtenerTodas() {
        const { rows } = await pool.query('SELECT * FROM cuentas');
        return rows;
    }

    // Crear una nueva cuenta
    static async crear(balance) {
        const { rows } = await pool.query('INSERT INTO cuentas (balance) VALUES ($1) RETURNING *', [balance]);
        return rows[0];
    }

    // Actualizar una cuenta existente por ID
    static async actualizar(id, balance) {
        const { rows } = await pool.query('UPDATE cuentas SET balance = $1 WHERE numero_cuenta = $2 RETURNING *', [balance, id]);
        if (rows.length === 0) {
            throw new Error('Cuenta no encontrada');
        }
        return rows[0];
    }

    // Eliminar una cuenta por ID
    static async eliminar(id) {
        const result = await pool.query('DELETE FROM cuentas WHERE numero_cuenta = $1', [id]);
        if (result.rowCount === 0) {
            throw new Error('Cuenta no encontrada');
        }
        return result.rowCount;
    }
}

module.exports = Cuenta;
