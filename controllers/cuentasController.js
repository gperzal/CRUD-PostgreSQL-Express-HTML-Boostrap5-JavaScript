// controllers/cuentasController.js
const Cuenta = require('../models/Cuenta');

// Obtener todas las cuentas
exports.obtenerTodas = async (req, res) => {
    try {
        const cuentas = await Cuenta.obtenerTodas();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva cuenta
exports.crear = async (req, res) => {
    const { balance } = req.body;
    try {
        const nuevaCuenta = await Cuenta.crear(balance);
        res.status(201).json(nuevaCuenta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una cuenta existente
exports.actualizar = async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    try {
        const cuentaActualizada = await Cuenta.actualizar(id, balance);
        if (!cuentaActualizada) {
            return res.status(404).json({ error: 'Cuenta no encontrada' });
        }
        res.json(cuentaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una cuenta
exports.eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        await Cuenta.eliminar(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
