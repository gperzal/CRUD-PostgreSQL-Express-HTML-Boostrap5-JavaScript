# CRUD Postgres + Express + MVC

Este proyecto es una aplicación web que realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos de cuentas.

## Tecnologías Utilizadas

- Node.js y Express para el servidor backend.
- PostgreSQL para la base de datos.
- Bootstrap para el diseño frontend.

## Instalación

### Pre-requisitos

- Es necesario tener instalado [Node.js](https://nodejs.org/).
- PostgreSQL debe estar instalado y corriendo en el sistema. Puedes descargarlo de [aquí](https://www.pgadmin.org/download/).

### Finalidad del Proyecto

La finalidad de este proyecto es proporcionar un ejemplo funcional de un CRUD completo utilizando las tecnologías mencionadas. Es adecuado para fines educativos y como base para proyectos más complejos.

### Configuración de la Base de Datos

Antes de usar la aplicación, configura tu base de datos PostgreSQL:

1. Inicia sesión en PostgreSQL y crea una nueva base de datos ejemplo `miBD`.
2. Utiliza el archivo `scripts.sql` provisto en la raíz del proyecto para crear las tablas necesarias y cargar datos iniciales.

### Configuración del Proyecto

1. Clona el repositorio a tu máquina local.
2. Navega a la carpeta del proyecto y ejecuta `npm install` para instalar las dependencias.
3. Edita el archivo `server.js` para configurar la conexión a la base de datos:

   ```javascript
   const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "miBD",
     password: "123456",
     port: 5432,
   });
   ```

Asegúrate de reemplazar '123456' con la contraseña real de tu usuario de PostgreSQL.

### Ejecución

Para iniciar la aplicación, corre el siguiente comando en la terminal:

`npm start`

La aplicación debería estar disponible en http://localhost:3000/.

## Contacto

Si tienes alguna pregunta o deseas contribuir al proyecto, puedes contactarme a través de:

- WhatsApp: [+5998876935](https://wa.me//5998876935)
- LinkedIn: [Guido Perez Zelaya](https://www.linkedin.com/in/guido-perez-zelaya-3b6a32113/)

Todos los derechos reservados por Guido Perez.
