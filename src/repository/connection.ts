import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

var con = mysql.createPool({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10802289',
    password: 'DURWxhdtJG',
    database: 'sql10802289',
});

const conSequelize = new Sequelize(
    'sql10802289',
    'sql10802289',
    'DURWxhdtJG', 
    {dialect: 'mysql', host: 'sql10.freesqldatabase.com'});

export { con, conSequelize };