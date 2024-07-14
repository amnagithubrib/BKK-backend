const Joi = require("joi");

const signupSchema = Joi.object({
    number: Joi.number().integer().required().custom((value, helpers) => {
        const stringValue = value.toString();

        if (stringValue.length === 12 && stringValue.startsWith("923")) {
            return value;
        }

        return helpers.error("any.invalid");
    }),
    pin: Joi.number().integer().required()
});

const loginSchema = Joi.object({
    number: Joi.number().integer().required(),
    pin: Joi.number().integer().required()
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
