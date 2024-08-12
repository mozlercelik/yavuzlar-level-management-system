

const Sequelize = require('sequelize')

const { CONNECTION_STRING } = require("../config")

const Database = new Sequelize(CONNECTION_STRING)

// const Database = new Sequelize({
//     dialect: "postgres",
//     database: 'ylms',
//     user: 'postgres',
//     password: 'postgres',
//     host: '127.0.0.1',
//     port: 5432,
//     ssl: false,
//     clientMinMessages: 'notice',
// });
// const Database = new Sequelize(db.name, db.username, db.password, {
//     host: "127.0.0.1",
//     dialect: "postgres"
// })

module.exports = Database