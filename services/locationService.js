const Locations = require("../db/models/locations");
class LocationService {
    static createLocation(data) {
        return Locations.query().insert(data).returning("*");
    }

    static getAllLocations() {
        return Locations.query();
    }

    static getLocationById(id) {
        return Locations.query().findById(id);
    }
}

module.exports = LocationService;
