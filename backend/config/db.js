const mysql = require('mysql');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this based on your needs
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Function to query utilizadores
const getUtilizadores = (callback) => {
    pool.query('SELECT * FROM utilizadores', (error, results) => {
        if (error) {
            console.error('Erro ao listar utilizadores:', error.message);
            return callback(error, null);
        }
        callback(null, results); // Return results through the callback
    });
};

// Export the function
module.exports = {
    getUtilizadores,
    pool, // Optional: export the pool if needed in other modules
};
