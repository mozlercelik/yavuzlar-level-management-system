var express = require('express');
const config = require('../config');
var router = express.Router();

router.use("/users", require("./users"))
router.use("/audit-logs", require("./audit_logs"))

module.exports = router;
