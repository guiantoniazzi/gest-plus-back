"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql2/promise');
var con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DB_GEST_MAIS'
});
exports.default = con;
