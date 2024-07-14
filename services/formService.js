const FormElement = require("../db/models/formElement");

class FormService {
    async createFormElementWithOption(formElementData) {
        try {
            console.log("Inserting form element with options");
            const insertedFormElement = await FormElement.query().insertGraph({
                ...formElementData,
                options: formElementData.options.map(option => ({
                    optionText: option.optionText,
                    optionValue: option.optionValue
                }))
            });
            return insertedFormElement;
        } catch (error) {
            console.error("Error creating form element with options:", error.message);
            throw error;
        }
    }

    async getFormElementById(id) {
        try {
            console.log(`Fetching form element with ID: ${id}`);
            const formElement = await FormElement.query().findById(id).withGraphFetched("options");
            return formElement;
        } catch (error) {
            console.log("Error fetching form element by ID: ", error.message);
            throw error;
        }
    }

    async getAllFormElements() {
        try {
            console.log("Fetching all form elements");
            const formElements = await FormElement.query().withGraphFetched("options");
            return formElements;
        } catch (error) {
            console.log("Error fetching all form elements: ", error.message);
            throw error;
        }
    }
}

module.exports = new FormService();
