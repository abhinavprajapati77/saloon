
const Sequelize = require("sequelize/dist");

const sequelize = new Sequelize('Abhinav_Salon', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize

// const mysql = require('mysql2');

// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: "admin@123",
//     database: 'login'
// })

// module.exports = pool.promise();