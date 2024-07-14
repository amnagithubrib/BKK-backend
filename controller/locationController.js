const LocationService = require("../services/locationService");
class LocationController {
    static async createLocation(req) {
        const { name, latitude, longitude, geoPolygon } = req.body;
        const data = { name, latitude, longitude, geoPolygon };
        return await this.handleOperation(async () => {
            const newLocation = await LocationService.createLocation(data);
            return { message: "Location created successfully", data: newLocation, statusCode: 201 };
        });
    }

    static async getAllLocations() {
        return await this.handleOperation(async () => {
            const locations = await LocationService.getAllLocations();
            return { message: "Locations retrieved successfully", data: locations, statusCode: 200 };
        });
    }

    static async getLocationById(req) {
        const { id } = req.params;
        return await this.handleOperation(async () => {
            const location = await LocationService.getLocationById(id);
            return { message: "Location retrieved successfully", data: location || null, statusCode: location ? 200 : 404 };
        });
    }

    static async handleOperation(operation) {
        try {
            return await operation();
        } catch (error) {
            console.error("Error:", error);
            const statusCode = error.statusCode || 500;
            return { message: "Internal server error", data: null, statusCode };
        }
    }
}

module.exports = LocationController;
