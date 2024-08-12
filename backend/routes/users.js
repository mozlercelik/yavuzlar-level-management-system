const express = require('express')
const { fetchUsers, createUser, updateLevel, deleteUser } = require('../handlers/users')
const router = express.Router()

// /users

router.get("/:level", fetchUsers)
router.post("/", createUser)
router.post("/level", updateLevel)
router.delete("/:id", deleteUser)

module.exports = router