const Zone = require("../db/models/zone");
const Location = require("../db/models/locations");

const ZoneService = {
    async createZone({ name, type, geoLocationData, partnerId, polygonData, locationIds }) {
        try {
            console.log({ locationIds });

            const formattedGeoLocationData = typeof geoLocationData === "string"
                ? geoLocationData
                : JSON.stringify(geoLocationData);

            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data: formattedGeoLocationData,
                partner_id: partnerId,
                polygon_data: JSON.stringify(polygonData)
            });
            return newZone;
        } catch (error) {
            console.error("Error creating zone:", error);
            throw error;
        }
    },
    async createZoneWithLocations({ name, type, geoLocationData, partnerId, locationIds, polygonData }) {
        try {
            const formattedGeoLocationData = typeof geoLocationData === "string"
                ? geoLocationData
                : JSON.stringify(geoLocationData);

            const newZone = await Zone.query().insert({
                name,
                type,
                geo_location_data: formattedGeoLocationData,
                partner_id: partnerId,
                polygon_data: JSON.stringify(polygonData)
            });
            await newZone.$relatedQuery("locations").relate(locationIds);
            const zoneWithLocationsAndPartner = await Zone.query()
                .findById(newZone.id)
                .withGraphFetched("[locations, partner]");
            return zoneWithLocationsAndPartner;
        } catch (error) {
            console.error("Error creating zone with locations:", error);
            throw error;
        }
    },
    async getAllZones() {
        try {
            const zones = await Zone.query().withGraphFetched("[locations, partner]");
            return zones;
        } catch (error) {
            console.error("Error fetching all zones:", error);
            throw error;
        }
    },
    async getZoneById(id) {
        try {
            const zone = await Zone.query().findById(id);
            return zone || null;
        } catch (error) {
            console.error("Error fetching zone by ID:", error);
            throw error;
        }
    },
    async getLocationsByZoneId(zoneId) {
        try {
            const locations = await Location.query().where("zone_id", zoneId);
            return locations;
        } catch (error) {
            console.error("Error fetching locations for zone:", error);
            throw error;
        }
    },
    async updateZone(id, { name, type, geoLocationData, polygonData }) {
        try {
            const formattedGeoLocationData = typeof geoLocationData === "string"
                ? geoLocationData
                : JSON.stringify(geoLocationData);

            const updatedZone = await Zone.query().patchAndFetchById(id, {
                name,
                type,
                geo_location_data: formattedGeoLocationData,
                polygon_data: JSON.stringify(polygonData)
            });
            return updatedZone || null;
        } catch (error) {
            console.error("Error updating zone:", error);
            throw error;
        }
    }
};

module.exports = ZoneService;
