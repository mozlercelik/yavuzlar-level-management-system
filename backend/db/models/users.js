const Sequelize = require('sequelize')
const db = require('../database')

const Users = db.define('users', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    level: { // leader - core - controller - redteam - software-development - yavuz
        type: Sequelize.STRING
    },
})

Users.sync().then(() => {
    console.log("Table created successfully!");
}).catch(err => console.log("Unable to create users table: ", err))

module.exports = Users