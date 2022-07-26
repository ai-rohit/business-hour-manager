const { check } = require('express-validator');
const res = require('express/lib/response');
const {days} = require("../config/constants")

function validateHours(hour){
    const isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(hour);
    return isValid;
}

module.exports.companyValidator = [
    check("name", "Invalid name")
    .isLength({min:1}).withMessage("Name is required")
    .isLength({max: 150}).withMessage("Name must not exceed 150 characters")
    .isString().trim().escape(),
    check("address", "Invalid address")
    .optional()
    .isLength({min: 1, max: 100})
    .isString().trim().escape(),
    check('phone')
    .optional()
    .isLength({min:10, max:10}).withMessage("Phone must be of 10 character")
    .isNumeric().trim().escape(),
    check("defaultStartingHour")
    .optional()
    .custom(value=>{
        console.log(diff("23:15", "6:00"))
        if(!validateHours(value)){
            return Promise.reject("Invalid value for starting hour")
        }
        return Promise.resolve();
    }).trim().escape(),
    check("defaultClosingHour")
    .optional()
    .custom(value=>{
        if(!validateHours(value)){
            return Promise.reject("Invalid value for closing hour")
        }
    }).trim().escape()
]

module.exports.updateCompanyValidator = [
    check("name", "Invalid name")
    .optional()
    .isLength({min:1, max: 150}).withMessage("Name must not exceed 150 characters")
    .isString().trim().escape(),
    check("address", "Invalid address")
    .optional()
    .isLength({min: 1, max: 100})
    .isString().trim().escape(),
    check('phone')
    .optional()
    .isLength({min:10, max:10}).withMessage("Phone must be of 10 character")
    .isNumeric().trim().escape(),
    check("defaultStartingHour")
    .optional()
    .custom(value=>{
        if(!validateHours(value)){
            return Promise.reject("Invalid value for starting hour")
        }
        return Promise.resolve();
    }).trim().escape(),
    check("defaultClosingHour")
    .optional()
    .custom(value=>{
        if(!validateHours(value)){
            return Promise.reject("Invalid value for closing hour")
        }
        return Promise.resolve()
    }).trim().escape()
]


/**
 * 
 *  data format [
 *  {
 *  day: 0,
 *  startingHour: 10:00,
 *  closingHour: 17:00,
 *  isClosingDay? : true
 * }
 * ] 
 */
module.exports.businessHoursValidator = [
    check('openHours', "Invalid value for open hours")
    .optional()
    .isArray()
    .custom((value)=>{
        let isDayValid = true;
        let isHourValid = true;
        let isRepeated = false;
        let isDayMissing = false;
        let checkedDays= [];
        for(let i = 0; i<value.length; i++){
            if(!value[i].day?.toString()){
                console.log(!value[i].day)
                isDayMissing = true;
                break;
            }
            if(!Object.keys(days).includes(value[i].day.toString())){
                isDayValid =false;
                break;
            }

            if(!validateHours(value[i].startingHour)){
                // console.log(value.startingHour)
                isHourValid = false;
                break;
            }

            if(!validateHours(value[i].closingHour)){
                isHourValid = false;
                break;
            }

            if(checkedDays.includes(value[i].day)){
                isRepeated = true;
                break;
            }
            checkedDays.push(value[i].day);
        }
        if(isDayMissing){
            return Promise.reject('Day value is missing')
        }
        if(!isDayValid){
            return Promise.reject('Invalid value for day')
        }

        if(!isHourValid){
            return Promise.reject('Invalid value passed in either startingHour or closingHour')
        }

        if(isRepeated){
            return Promise.reject("Repeated value found in data please try again!")
        }
        return Promise.resolve();
    })
]

module.exports.updateOpenHourValidation = [
    check('startingHour').optional()
    .custom(value=>{
        if(!validateHours(value)){
            return Promise.reject("Invalid value for starting hours")
        }
        return Promise.resolve();
    }),
    check('closingHour').optional()
    .custom(value=>{
        if(!validateHours(value)){
            return Promise.reject("Invalid value for closing hours")
        }
        return Promise.resolve();
    }),
    check('isClosingDay').optional()
    .isBoolean().withMessage("isClosingDay accepts boolean only")
]