const { Model } = require("objection");
const FormElement = require("./formElement");
class FormOption extends Model {
    static get tableName() {
        return "formOptions";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["optionText", "optionValue"],
            properties: {
                id: { type: "integer" },
                optionText: { type: "string" },
                optionValue: { type: "string" },
                type: { type: "string", enum: ["text", "checkbox", "radio", "switch", "date", "time", "image", "audio", "video", "dropdown"] },
                elementId: { type: "integer" }
            }
        };
    }

    static get relationMappings() {
        return {
            element: {
                relation: Model.BelongsToOneRelation,
                modelClass: FormElement,
                join: {
                    from: "formOptions.elementId",
                    to: "formElements.elementId"
                }
            }
        };
    }
}
module.exports = FormOption;
