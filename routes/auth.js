const express = require("express");
const { login, register } = require("../controllers");
// const {checkErrors} = require("../validations")
const {wrapAsync} = require("../helpers");
const { validateLogin, registerValidation, checkErrors } = require("../validations");

const router = express.Router();

router.post("/login", validateLogin, checkErrors, wrapAsync(login));
router.post("/register", registerValidation, checkErrors, wrapAsync(register));

module.exports = router;