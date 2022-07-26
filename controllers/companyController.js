const { CustomError } = require("../helpers");
const { companyService, openHourService } = require("../services");
const { days } = require("../config/constants")

let companyController = {};

companyController.createCompany = async(req, res, next)=>{
    const {name, address, phone, defaultStartingHour, defaultClosingHour} = req.body;
    const companyData = {
        name,
        address,
        phone,
        defaultClosingHour,
        defaultStartingHour,
        createdBy: req.user.id
    };

    const newCompany = await companyService.add(companyData);
    return res.status(200).json(newCompany);
}

companyController.updateCompany = async(req, res, next)=>{
    const {name, address, phone, defaultStartingHour, defaultClosingHour} = req.body;

    let company = await companyService.findOne({id: req.params.id});
    if(!company){
        return next(new CustomError("Couldn't find the company, Please try again", 404));
    }

    name ? company.name = name : null;
    address?company.address = address: null;
    phone?company.phone = phone : null;
    defaultStartingHour? company.defaultStartingHour = defaultStartingHour : null;
    defaultClosingHour? company.defaultClosingHour = defaultClosingHour: null;

    company = await company.save();

    return res.status(200).json(company)
}

companyController.addBusinessHours = async(req, res, next)=>{
    const {openHours} = req.body;
    const updatedHours = [];
    let company = await companyService.findOne({id: req.params.id});
    if(!company){
        return next(new CustomError("Couldn't find the company, Please try again", 404));
    }
    if(openHours && openHours.length>0){
        for(let i = 0; i<openHours.length; i++){
            let data = await openHourService.addOrUpdate(openHours[i], req.params.id);
            updatedHours.push(data);
        };
    }

    return res.status(200).json(updatedHours);
}

companyController.updateBusinessHour = async(req, res, next)=>{
    const { hourId, id } = req.params;
    const {startingHour, closingHour, isClosingDay} = req.body;
    let businessHour = await openHourService.findOne({
        id: hourId,
        company: id
    });

    if(!businessHour){
        return next(new CustomError("Couldn't find the open hour of the day", 404));
    }

    if(startingHour){
        businessHour.startingHour = startingHour;
    }

    if(closingHour){
        businessHour.closingHour = closingHour;
    }

    if(isClosingDay === false){
        businessHour.isClosingDay = false;
    }else{
        businessHour.isClosingDay = true;
    }

    businessHour = await businessHour.save();
    return res.status(200).json(businessHour);
}

companyController.getCompanyDetail = async(req, res, next)=>{
    let company = await companyService.findOneWithOpenHours({
        id: req.params.id
    });
    if(!company){
        return next(new CustomError("Can't find the company, Please try again", 404))
    }
    if(company.openHours){
        company.openHours = company.openHours.map(data=>{
            // console.log(data);
            data.setDataValue("dayValue", days[data.day.toString()])
            return data;
        })
    }
    return res.status(200).json(company);
}
module.exports = companyController;