const express = require('express')
const { checkKey, login, logout } = require('../handlers/auth')
const router = express.Router()

// /users

router.post("/login", login)
router.get("/check", checkKey)
router.get("/logout", logout)

module.exports = router