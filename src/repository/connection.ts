var mysql = require('mysql2/promise');

var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DB_GEST_MAIS'
});

export default con;