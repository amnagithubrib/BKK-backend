const { Model } = require("objection");

class Zone extends Model {
    static get tableName() {
        return "zones";
    }

    static get idColumn() {
        return "id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                id: { type: "integer" },
                partnerId: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                type: { type: "string", maxLength: 255 },
                geo_location_data: { type: "string" },
                polygon_data: { type: "array", items: { type: "array", items: { type: "number" } } }
            }
        };
    }

    static get relationMappings() {
        return {
            locations: {
                relation: Model.ManyToManyRelation,
                modelClass: require("./locations"),
                join: {
                    from: "zones.id",
                    through: {
                        from: "zone_locations.zone_id",
                        to: "zone_locations.location_id"
                    },
                    to: "locations.location_id"
                }
            },
            partner: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./partners"),
                join: {
                    from: "zones.partnerId",
                    to: "partners.id"
                }
            }
        };
    }
}

module.exports = Zone;
