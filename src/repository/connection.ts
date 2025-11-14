import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

var con = mysql.createPool({
    host: 'db-gest-mais.mysql.uhserver.com',
    user: 'admin_gm',
    password: 'gestmais@12',
    database: 'db_gest_mais',
});

const conSequelize = new Sequelize(
    'db_gest_mais',
    'admin_gm',
    'gestmais@12', 
    {dialect: 'mysql', host: 'db-gest-mais.mysql.uhserver.com', port: 3306});

export { con, conSequelize };