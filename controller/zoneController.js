const zoneService = require("../services/zoneService");
async function createZone(req, res) {
    try {
        const { name, type, geoLocationData, partnerId, locationIds, polygonData } = req.body;
        const zone = await zoneService.createZone({ name, type, geoLocationData, partnerId, locationIds, polygonData });
        console.log({ locationIds });
        res.status(201).json(zone);
    } catch (error) {
        console.error("Error creating zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getAllZones(req, res) {
    try {
        const zones = await zoneService.getAllZones();
        res.json(zones);
    } catch (error) {
        console.error("Error fetching zones:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getZoneById(req, res) {
    try {
        const zone = await zoneService.getZoneById(req.params.id);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.json(zone);
    } catch (error) {
        console.error("Error fetching zone by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createZoneWithLocations(req, res) {
    try {
        const { name, type, geoLocationData, partnerId, locationIds, polygonData } = req.body;
        const zone = await zoneService.createZoneWithLocations({ name, type, geoLocationData, partnerId, locationIds, polygonData });
        res.status(201).json(zone);
    } catch (error) {
        console.error("Error creating zone with locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getLocationsByZoneId(req, res) {
    try {
        const { id } = req.params;
        const locations = await zoneService.getLocationsByZoneId(id);
        if (locations && locations.length > 0) {
            res.status(200).json(locations);
        } else {
            res.status(404).json({ error: "No locations found for the specified zone" });
        }
    } catch (error) {
        console.error("Error fetching locations for zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateZone(req, res) {
    try {
        const zone = await zoneService.updateZone(req.params.id, req.body);
        if (!zone) {
            return res.status(404).json({ error: "Zone not found" });
        }
        res.json(zone);
    } catch (error) {
        console.error("Error updating zone:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {
    createZone,
    getAllZones,
    getZoneById,
    getLocationsByZoneId,
    updateZone,
    createZoneWithLocations
};
