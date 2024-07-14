const express = require("express");
const RegistrationsController = require("../controller/registrationsController");
const { validateSignup, validateLogin } = require("../middleware/registrationsValidation");
const router = express.Router();

router.post("/Registrations", validateSignup, (req, res) => {
    RegistrationsController.signup(req, res);
});

router.post("/loginRegistrations", validateLogin, (req, res) => {
    RegistrationsController.login(req, res);
});

module.exports = router;
