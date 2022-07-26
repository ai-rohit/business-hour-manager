const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/companies", require("./company"));

module.exports = router;