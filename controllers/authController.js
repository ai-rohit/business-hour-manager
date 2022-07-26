const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {userService} = require("../services");
const {CustomError} = require("../helpers");

let authController = {};

authController.login = async(req, res, next)=>{
    const {email, password} = req.body;
    let user = await userService.findOne({email});
    if(!user){
      return next(new CustomError("Email or password doesn't match", 400))
    }
    
    let passwordMatches = await bcrypt.compare(password, user.password);
    if(!passwordMatches){
      return next(new CustomError("Email or password doesn't match", 400))
    }
    const jwtToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
      expiresIn: "30d"
    })
    return res.status(200).json({
      token: jwtToken
    })
}

authController.register = async(req, res, next)=>{
    let user = await userService.findOne({
        email: req.body.email,
    })

    if(user){
        return next(new CustomError("Email already in use", 400)) 
    }
    const {name, email, phone, password} = req.body;
    const userData = {
        name,
        email,
        phone,
        password: await bcrypt.hash(password, 10)
    }

    const newUser = await userService.add(userData);
    return res.status(200).json(newUser);
}

module.exports = authController;