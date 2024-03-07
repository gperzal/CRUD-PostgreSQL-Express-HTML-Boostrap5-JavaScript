const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miBD',
    password: '123456',
    port: 5432,
});



app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta public

// GET: Obtener todas las cuentas
app.get('/cuentas', async (req, res) => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM cuentas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// POST: Crear una nueva cuenta
app.post('/cuentas', async (req, res) => {
    const { balance } = req.body;
    const client = await pool.connect();
    try {
        const { rows } = await client.query('INSERT INTO cuentas (balance) VALUES ($1) RETURNING *', [balance]);
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// PUT: Actualizar una cuenta existente
app.put('/cuentas/:id', async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('SAVEPOINT before_update');
        const { rows } = await client.query('UPDATE cuentas SET balance = $1 WHERE numero_cuenta = $2 RETURNING *', [balance, id]);
        if (rows.length === 0) {
            throw new Error('Cuenta no encontrada');
        }
        await client.query('COMMIT');
        res.json(rows[0]);
    } catch (error) {
        await client.query('ROLLBACK TO before_update');
        await client.query('COMMIT'); // Es opcional terminar la transacción después de un rollback a un savepoint
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// DELETE: Eliminar una cuenta
app.delete('/cuentas/:id', async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM cuentas WHERE numero_cuenta = $1', [id]);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// Escuchar en el puerto 3000
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
