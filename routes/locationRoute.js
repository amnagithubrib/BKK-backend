const express = require("express");
const { Authenticated } = require("../middleware/registerauth");
const { agentAuthenticated } = require("../middleware/agentsAuth");
const LocationController = require("../controller/locationController");
const router = express.Router();

router.post("/location", Authenticated, async (req, res) => {
    const result = await LocationController.createLocation(req);
    res.status(result.statusCode).json(result);
});

router.get("/locations", Authenticated, async (req, res) => {
    const result = await LocationController.getAllLocations();
    res.status(result.statusCode).json(result);
});

router.get("/locations/:id", Authenticated, async (req, res) => {
    const result = await LocationController.getLocationById(req);
    res.status(result.statusCode).json(result);
});

module.exports = router;
