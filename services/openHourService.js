const { BusinessHour } = require("../models");

let openHourService = {};

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

openHourService.addOrUpdate = async(data, company)=>{
    let businessHour = await BusinessHour.findOne({
        where: {
            company,
            day: data.day
        }
    });
    if(!businessHour){
        const newHour = await BusinessHour.create({...data, company});
        return newHour;
    }else{
        if(data.startingHour){
            businessHour.startingHour = data.startingHour;
        }
        
        if(data.closingHour){
            businessHour.closingHour = data.closingHour;

        }

        if(data.isClosingDay.toString() === "true"){
            businessHour.isClosingDay = true;
        }else{
            businessHour.isClosingDay = false;
        }
        businessHour = await businessHour.save();
        return businessHour;
    }
}

openHourService.findOne = async(query)=>{
    const businessHour = await BusinessHour.findOne({
        where: query
    })
    return businessHour;
}

// openHourService.addBusinessHours = async(data, company)=>{
//     for(let i = 0; i<data.length; i++){
//         const businessHour = await BusinessHour.findOne({
//             where: {
//                 company,
//                 day: data.day
//             }
//         });
//         if(!businessHour){
//             await BusinessHour.create(data)
//         }else{
//             if(data.startingHour){
//                 businessHour.startingHour = data.startingHour;
//             }
            
//             if(data.closingHour){
//                 businessHour.closingHour = data.closingHour;

//             }

//             if(data.isClosingDay == true){
//                 businessHour.isClosingDay = true;
//             }else{
//                 businessHour.isClosingDay = false;
//             }
//             await businessHour.save();
//         }
//     }
// }

module.exports = openHourService;