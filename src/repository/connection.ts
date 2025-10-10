import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

var con = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.HOST_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'DB_GEST_MAIS',
});

const conSequelize = new Sequelize(
    process.env.DB_NAME || 'DB_GEST_MAIS',
    process.env.HOST_USER || 'root',
    process.env.DB_PASSWORD || '', 
    {dialect: 'mysql', host: process.env.HOST || 'localhost'});

export { con, conSequelize };