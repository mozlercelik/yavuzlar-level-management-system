const express = require("express")
const router = express.Router()

const isAuthenticated = true

router.all("*", (req, res, next) => {
    if (isAuthenticated) {
        next()
    } else {
        res.json({ status: "401", message: "unauthorized" })
    }
})

router.get("/:id", (req, res, next) => {
    res.json({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers
    })
})

module.exports = router