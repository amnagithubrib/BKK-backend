const { Model } = require("objection");

class partner extends Model {
    static get tableName() {
        return "partners";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "email", "address"],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                email: { type: "string" },
                address: { type: "string" },
                password: { type: "string" },
                role: { type: "string", default: "partner" }
            }
        };
    }

    static get relationMappings() {
        return {
            zones: {
                relation: Model.HasManyRelation,
                modelClass: require("./zone"),
                join: {
                    from: "partners.id",
                    to: "zones.partnerId"
                }
            }
        };
    }

    async $beforeInsert() {
        if (!this.role) {
            this.role = "partner";
        }
    }
}

module.exports = partner;
