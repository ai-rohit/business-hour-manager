const {Company, BusinessHour} = require("../models")

let companyService = {};

companyService.add = async(data)=>{
  let company = await Company.create(data);
  return company;
}

companyService.findOne = async(query)=>{
    const company = await Company.findOne({
        where: query
    })
    return company;
}

companyService.findAll = async(query)=>{
    const companies = await Company.findAll({
        where: query
    })
    return companies;
}

companyService.findOneWithOpenHours = async(query)=>{
    const company = await Company.findOne({
        where: query,
        include:{
            model: BusinessHour,
            as: "openHours"
        } 
    })
    return company;
}

module.exports = companyService;