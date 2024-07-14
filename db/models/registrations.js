const { Model } = require("objection");
class Registrations extends Model {
    static get tableName() {
        return "registrations";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "email", "password"],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string", format: "email" },
                password: { type: "string" }
            }
        };
    }
}

module.exports = Registrations;
