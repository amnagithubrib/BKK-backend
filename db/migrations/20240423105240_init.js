/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("agents", table => {
            table.increments("id");
            table.string("name");
            table.bigInteger("number").notNullable().unique();
            table.integer("pin").notNullable();
            table.timestamps(true, true);
        })
        .createTable("registrations", table => {
            table.increments("id");
            table.string("name").notNullable();
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.timestamps(true, true);
        })
        .createTable("partners", table => {
            table.increments("id");
            table.string("name").notNullable();
            table.string("email").notNullable();
            table.string("address").notNullable();
            table.string("password");
            table.string("role").notNullable().defaultTo("partner");
        })
        .createTable("zones", table => {
            table.increments("id");
            table.integer("partner_id").unsigned().references("id").inTable("partners").onDelete("CASCADE");
            table.string("name").notNullable();
            table.string("type");
            table.string("geo_location_data");
            table.json("polygon_data");
        })
        .createTable("locations", table => {
            table.increments("location_id");
            table.string("name");
            table.decimal("latitude", 9, 6);
            table.decimal("longitude", 9, 6);
            table.string("geoPolygon");
            // table.integer("zone_id").unsigned().references("id").inTable("zones").onDelete("CASCADE");
        })
        .createTable("zone_locations", table => {
            table.integer("zone_id").unsigned().references("id").inTable("zones").onDelete("CASCADE");
            table.integer("location_id").unsigned().references("location_id").inTable("locations").onDelete("CASCADE");
            table.primary(["zone_id", "location_id"]);
        })
        .createTable("formElements", table => {
            table.increments("elementId");
            table.string("elementLabel").notNullable();
            table.enum("elementType", ["text", "checkbox", "radio", "switch", "date", "time", "image", "audio", "video", "dropdown"]).notNullable();
            table.dateTime("dateCreated").notNullable().defaultTo(knex.fn.now());
            table.boolean("isRequired").notNullable();
        })
        .createTable("formOptions", table => {
            table.increments("id");
            table.integer("elementId").unsigned().references("elementId").inTable("formElements").onDelete("CASCADE");
            table.string("optionText").notNullable();
            table.string("optionValue").notNullable();
            // table.timestamps(true, true);
        });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("formOptions")
        .dropTableIfExists("formElements")
        .dropTableIfExists("zone_locations")
        .dropTableIfExists("locations")
        .dropTableIfExists("zones")
        .dropTableIfExists("agents")
        .dropTableIfExists("partners")
        .dropTableIfExists("registrations");
};
