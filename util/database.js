const mysql = require('mysql2');
const Pool = mysql.createPool({
    host: 'localhost',
    user: 'srajan',
    password: 'Project@123',
    database: 'bloodbank'
})
module.exports = Pool.promise();