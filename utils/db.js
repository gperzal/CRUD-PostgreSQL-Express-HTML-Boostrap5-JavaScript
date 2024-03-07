// utils/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miBD',
    password: '010203',
    port: 5432,
});

module.exports = pool;
