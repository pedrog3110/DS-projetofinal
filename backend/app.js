const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this based on your needs
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection pool
pool.getConnection((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso.');
});

// Define the route to list utilizadores
app.get('/utilizadores', (req, res) => {
    pool.query('SELECT * FROM utilizadores', (error, results) => {
        if (error) {
            console.error('Erro ao listar utilizadores:', error.message);
            return res.status(500).json({ error: 'Erro ao listar utilizadores' });
        }
        res.json(results); // Return the list of utilizadores as JSON
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
