import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

var con = mysql.createPool({
    host: 'gest-plus-gestmais.f.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_Ed5gtzejQ8ra1hx_t4f',
    database: 'defaultdb',
});

const conSequelize = new Sequelize(
    'defaultdb',
    'avnadmin',
    'AVNS_Ed5gtzejQ8ra1hx_t4f', 
    {dialect: 'mysql', host: 'gest-plus-gestmais.f.aivencloud.com'});

export { con, conSequelize };