const {check} = require("express-validator")

module.exports.validateLogin = [
    check("email", "Invalid value for email")
    .isLength({min:1}).withMessage("Email is required")
    .isLength({max: 100}).withMessage("Email can't exceed 100 characters").isEmail().trim().escape(),
    check("password")
    .isLength({min:1}).withMessage("Password is required")
    .isLength({max: 16}).withMessage("Password must not exceed 16 characters").trim().escape()
];

module.exports.registerValidation = [
    check("name", "Invalid name")
    .isLength({min:1}).withMessage("Name is required")
    .isLength({max: 50}).withMessage("Name must not exceed 50 characters")
    .isString().trim().escape(),
    check("phone", "Invalid phone")
    .isLength({min:10, max:10}).withMessage("Phone is required")
    .isNumeric().trim().escape(),
    check("email", "Invalid email")
    .isLength({min:1}).withMessage("Email is required")
    .isEmail().trim().escape(),
    check("password", "Invalid password")
    .isLength({min:1}).withMessage("Password is required")
    .isLength({max: 16}).withMessage("Password must not exceed 16 characters")
    .isString().trim().escape(),
    check("confirmPassword", "Invalid password")
    .isLength({min:1}).withMessage("Password is required")
    .isLength({max: 16}).withMessage("Password must not exceed 16 characters")
    .isString().trim().escape().custom((value, {req})=>{
        if (value !== req.body.password) {
            console.log(req.body.password, value)
            return Promise.reject("Password and confirm password doesn't match")
        }
        return Promise.resolve();
    })
  ]