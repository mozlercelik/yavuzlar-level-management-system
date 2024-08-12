const express = require('express')
const Users = require('../db/models/users')
const Database = require('../db/database')
const { API_KEY_ADMIN } = require('../config')
let levels = ["leader", "core", "controller", "redteam", "software-development"]

const validAdmin = key => key == API_KEY_ADMIN

const fetchUsers = async (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const fullname = req.session.fullname;

    if (!isLoggedIn)
        return res.send({
            status: "error",
            message: "Unauthorized access.",
            data: null
        })

    let query = ""
    if (req.params.level == "all")
        query = "SELECT * FROM users ORDER BY id ASC"
    else if (levels.includes(req.params.level))
        query = "SELECT * FROM users WHERE level=:level ORDER BY id ASC"
    else
        return res.send({
            status: "error",
            message: "Invalid level.",
            data: null
        })

    const users = await Database.query(query, {
        replacements: { level: req.params.level }
    })
        .then((data) => {
            return res.send({
                status: "success",
                message: "Users fetched successfully.",
                data: data[0]
            })
        })
        .catch((err) => console.log("error", err))
    // Users.findAll().then((users) => res.json(users)).catch(err => console.log(err))
}

const createUser = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const admin = req.session.admin;
    const fullname = req.session.fullname;

    if (!isLoggedIn && !validAdmin(admin))
        return res.send({
            status: "error",
            message: "Unauthorized access.",
            data: null
        })

    if (req.body && req.body?.first_name && req.body?.last_name && req.body?.level) {
        Users.create({
            first_name: req.body?.first_name,
            last_name: req.body?.last_name,
            level: req.body?.level
        })
            .then(() => {
                return res.send({
                    status: "success",
                    message: "New user created successfully for: " + req.body?.first_name,
                    data: null
                })
            })
            .catch(err => console.log("New user could not created: ", err))
    } else {
        return res.send({
            status: "error",
            message: "Please fill all params.",
            data: null
        })
    }
    // res.send({
    //   status: "success",
    //   body: req.body,
    //   params: req.params,
    //   query: req.query,
    //   headers: req.headers
    // })
}

const updateLevel = async (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const admin = req.session.admin;
    const fullname = req.session.fullname;

    if (!isLoggedIn && !validAdmin(admin))
        res.send({
            status: "error",
            message: "Unauthorized access.",
            data: null
        })

    if (req.body && req.body?.level) {
        if (req.body?.level && req.body?.id) {
            if (!levels.includes(req.body?.level)) res.send({
                status: "error",
                message: "Incorrect level. You can use these: " + JSON.stringify(whitelist),
                data: null
            })

            await Database.query('UPDATE users SET level=:level WHERE id=:id', {
                replacements: { level: req.body?.level, id: req.body?.id },
            })
                .then(() => {
                    res.send({
                        status: "success",
                        message: "The user updated successfully.",
                        data: null
                    })
                })
                .catch(() => console.log("error"))
        } else {
            res.send({
                status: "error",
                message: "Level & id is incorrect.",
                data: null
            })
        }

    }
}

const deleteUser = async (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const admin = req.session.admin;
    const fullname = req.session.fullname;

    if (!isLoggedIn && !validAdmin(admin))
        res.send({
            status: "error",
            message: "Unauthorized access.",
            data: null
        })

    if (req.params?.id) {
        await Database.query('DELETE FROM users WHERE id=:id', {
            replacements: { id: req.params?.id },
        })
            .then(() => {
                return res.send({
                    status: "success",
                    message: "The user deleted successfully.",
                    data: null
                })
            })
            .catch(() => console.log("error"))
    } else {
        return res.send({
            status: "error",
            message: "id is incorrect.",
            data: null
        })
    }
}


module.exports = {
    fetchUsers,
    createUser,
    updateLevel,
    deleteUser
}