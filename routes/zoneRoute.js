const express = require("express");
const zoneController = require("../controller/zoneController");
const { Authenticated } = require("../middleware/registerauth");
const router = express.Router();

router.post("/zones", Authenticated, zoneController.createZone);
router.get("/zones", Authenticated, zoneController.getAllZones);
router.get("/zones/:id", Authenticated, zoneController.getZoneById);
router.get("/zones/:id/locations", zoneController.getLocationsByZoneId);
router.put("/zones/:id", Authenticated, zoneController.updateZone);
router.post("/zoness", Authenticated, zoneController.createZoneWithLocations);
module.exports = router;
