const express = require("express");
const { createCompany, updateCompany, addBusinessHours, updateBusinessHour, getCompanyDetail } = require("../controllers");
const {checkErrors, companyValidator, updateCompanyValidator, businessHoursValidator, updateOpenHourValidation} = require("../validations")
const {verifyLogin} = require("../middlewares")
const {wrapAsync} = require("../helpers")

const router = express.Router();

router.post("/", verifyLogin, companyValidator, checkErrors, wrapAsync(createCompany));
router.get("/:id", wrapAsync(getCompanyDetail))
router.patch("/:id", verifyLogin, updateCompanyValidator, checkErrors, wrapAsync(updateCompany));
router.put("/:id/open-hours", verifyLogin, businessHoursValidator, checkErrors, wrapAsync(addBusinessHours));
router.patch("/:id/open-hours/:hourId", verifyLogin, updateOpenHourValidation, checkErrors, wrapAsync(updateBusinessHour));

module.exports = router;