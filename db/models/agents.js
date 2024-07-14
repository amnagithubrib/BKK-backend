const { Model } = require("objection");
class agents extends Model {
    static get tableName() {
        return "agents";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["number", "pin"],
            properties: {
                id: { type: "integer" },
                // name: { type: "string" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                number: { type: "number" },
                pin: { type: "integer" }
            }
        };
    }
}

module.exports = agents;
