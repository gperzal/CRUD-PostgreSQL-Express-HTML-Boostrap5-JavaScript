// routes/cuentasRoutes.js
const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentasController');

// Definir las rutas para las operaciones CRUD de las cuentas
router.get('/cuentas', cuentasController.obtenerTodas); // Obtener todas las cuentas
router.post('/cuentas', cuentasController.crear); // Crear una nueva cuenta
router.put('/cuentas/:id', cuentasController.actualizar); // Actualizar una cuenta existente
router.delete('/cuentas/:id', cuentasController.eliminar); // Eliminar una cuenta

module.exports = router;
