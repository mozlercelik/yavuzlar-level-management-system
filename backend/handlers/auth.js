
const validKey = (k) => k && k == key
const { API_KEY, API_KEY_ADMIN } = require("../config")
const key = API_KEY

const login = async (req, res, next) => {
    const isLoggedIn = req.session?.isLoggedIn ?? false;
    const fullname = req.session?.fullname;

    if (isLoggedIn) {
        return res.status(400).send({
            status: "error",
            message: "You already logged in.",
            data: null
        })
    }

    if (!validKey(req?.body?.key))
        return res.send({
            status: "error",
            message: "Key is incorrect.",
            data: null
        })

    if (!req.body.fullname) {
        return res.status(400).send({
            status: "error",
            message: "Invalid name.",
            data: null
        })
    }

    req.session.isLoggedIn = true
    req.session.fullname = req.body.fullname
    req.session.admin = req.body.admin_key == API_KEY_ADMIN ? API_KEY_ADMIN : null

    return res.status(200).send({
        status: "success",
        message: "Key is correct. login successfully",
        data: "success"
    })
}

const checkKey = async (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const admin = req.session.admin;
    const fullname = req.session.fullname;

    if (isLoggedIn)
        return res.send({
            status: "success",
            message: `Logged in.`,
            data: admin ? "admin" : "user"
        })
    else
        return res.status(401).send({
            status: "error",
            message: `Unauthorized.`,
            data: "unauthorized"
        })
}

const logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
    });

    return res.status(200).send({
        status: "success",
        message: `Logout success.`,
        data: null
    })
}

module.exports = {
    login,
    checkKey,
    logout
}