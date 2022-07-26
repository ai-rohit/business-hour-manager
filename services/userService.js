const {User} = require("../models");

let userService = {};

userService.findAll = async()=>{
  const users = await User.findAll({
    attributes:["id", "name", "email", "phone", "createdAt"]
  });
  return users;
}

userService.findOne = async(query)=>{
  const user = await User.findOne({
    where: query
  })
  return user;
}

userService.add = async(data) =>{
  let user = await User.create(data);
  return user;
}

userService.delete = async(query)=>{
  return await User.destroy({
    where:query
  })
}

userService.update = async(data, query)=>{
  const user = await User.update(data, {
    where:query,
    returning: true
  });
  return user;
}

module.exports = userService;