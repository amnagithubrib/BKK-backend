const Joi = require("joi");
const FormService = require("../services/formService");

// const formElementSchema = Joi.object({
//     elementLabel: Joi.string().required(),
//     elementType: Joi.string().required(),
//     isRequired: Joi.boolean().required(),
//     options: Joi.array().items(
//         Joi.object({
//             optionText: Joi.string().required(),
//             optionValue: Joi.string().required()
//         })
//     ).optional()
// });
const formElementSchema = Joi.object({
    elementLabel: Joi.string().required(),
    elementType: Joi.string().valid("text", "checkbox", "date", "time", "radio", "switch", "image", "audio", "video", "dropdown").required(),
    isRequired: Joi.boolean().required(),
    options: Joi.array().items(Joi.object({
        optionText: Joi.string().required(),
        optionValue: Joi.string().required()
    })).optional()
});

class FormController {
    async createFormElement(req, res) {
        const { error, value } = Joi.array().items(formElementSchema).validate(req.body);
        if (error) {
            console.log("Validation error: ", error.details[0].message);
            // return res.status(400).json({ success: false, message: error.details[0].message });
            return { success: false, message: error.details[0].message };
        }

        try {
            console.log("Creating form elements");
            const newFormElements = await Promise.all(value.map(async (formElementData) => {
                return await FormService.createFormElementWithOption(formElementData);
            }));

            // return res.status(201).json({ success: true, data: newFormElements });
            return { success: true, data: newFormElements };
        } catch (error) {
            console.log("Error creating form elements: ", error.message);
            // return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
            return { success: false, message: error.message || "Internal Server Error" };
        }
    }

    async getFormElement(req) {
        const { id } = req.params;
        try {
            console.log(`Fetching form element with ID: ${id}`);
            const formElement = await FormService.getFormElementById(id);

            if (!formElement) {
                return { success: false, message: "Form element not found" };
            }

            return { success: true, data: formElement };
        } catch (error) {
            console.log("Error fetching form element: ", error.message);
            return { success: false, message: error.message || "Internal Server Error" };
        }
    }

    async getAllFormElements(req) {
        try {
            console.log("Fetching all form elements");
            const formElements = await FormService.getAllFormElements();
            return { success: true, data: formElements };
        } catch (error) {
            console.log("Error fetching all form elements: ", error.message);
            return { success: false, message: error.message || "Internal Server Error" };
        }
    }
}

module.exports = new FormController();
