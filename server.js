const express = require('express');
const path = require('path');
const cuentasRoutes = require('./routes/cuentasRoutes'); // Importar las rutas de cuentas

const app = express();

app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.static('public')); // Para servir archivos estáticos desde la carpeta public

app.use('/api', cuentasRoutes); // Usar las rutas de cuentas bajo el prefijo '/api'

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
