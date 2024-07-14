const { Model } = require("objection");

class ZoneLocation extends Model {
    static get tableName() {
        return "zone_locations";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["zone_id", "location_id"],
            properties: {
                id: { type: "integer" },
                zone_id: { type: "integer" },
                location_id: { type: "integer" }
            }
        };
    }
}

module.exports = ZoneLocation;
