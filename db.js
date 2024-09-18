const Pool = require('pg').Pool;

const db = new Pool({
    user : "postgres" ,
    password:"ezzeldeen19782002#" ,
    port:5433,
    database:'todolist'
});

module.exports = db;