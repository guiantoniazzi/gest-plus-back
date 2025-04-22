import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DB_GEST_MAIS'
});

const conSequelize = new Sequelize('DB_GEST_MAIS', 'root', '', {dialect: 'mysql', host: 'localhost'});

export { con, conSequelize };