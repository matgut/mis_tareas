const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./config');

const pool = mysql.createPool(database);
pool.getConnection((err, conex) =>{
    switch (err) {
        case 'PROTOCOL_CONNECTION_LOST':
            console.log('conexion con la base de datos fue cerrada');
            break;
        case 'ER_CON_COUNT_ERROR':
            console.log('DB tiene mas de una conexion');
            break;
        case 'ECONNREFUSED':
            console.log('DB rechazada');
            break;
    }

    if (conex) conex.release();
    console.log('DB conectada');
    return;
});

pool.query = promisify(pool.query);//convierto a promesas lo que son callbacks
module.exports = pool;