const Joi = require("joi");
const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const validateSignup = async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.details[0].message });
    }
};

const validateLogin = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.details[0].message });
    }
};

module.exports = {
    validateSignup,
    validateLogin
};
