const express = require("express");
const { Authenticated, Authorized } = require("../middleware/registerauth");
// const { agentAuthenticated } = require("../middleware/agentsAuth");
const partnersController = require("../controller/partnerController");

const router = express.Router();

router.get("/partners", Authenticated, async (req, res) => {
    const result = await partnersController.getAllpartners(req);
    res.send(result);
});

router.post("/Createpartners", Authenticated, Authorized("admin"), async (req, res) => {
    const result = await partnersController.createpartner(req);
    res.send(result);
});

router.post("/logoutpartner", async (req, res) => {
    const result = await partnersController.logoutpartner(req);
    res.send(result);
});

router.post("/registerpartners", async (req, res) => {
    const result = await partnersController.registerpartner(req);
    res.send(result);
});

router.post("/loginpartners", async (req, res) => {
    const result = await partnersController.loginpartner(req);
    res.send(result);
});
router.post("/createAgent", async (req, res) => {
    const result = await partnersController.createAgent(req);
    res.send(result);
});
router.delete("/deleteAgent/:id", async (req, res) => {
    const result = await partnersController.deleteAgent(req);
    if (result.success) {
        res.send(result);
    } else {
        res.status(500).send(result);
    }
});
router.put("/updateAgent/:id", async (req, res) => {
    const result = await partnersController.updateAgent(req);
    if (result.success) {
        res.send(result);
    } else {
        res.status(500).send(result);
    }
});
router.get("/getAgent/:id", async (req, res) => {
    const result = await partnersController.getAgent(req);
    if (result.success) {
        res.send(result);
    } else {
        res.status(500).send(result);
    }
});

router.get("/getAllAgents", async (req, res) => {
    const result = await partnersController.getAllAgents(req);
    if (result.success) {
        res.send(result);
    } else {
        res.status(500).send(result);
    }
});
router.get("/partners/:id", Authenticated, async (req, res) => {
    const result = await partnersController.getpartnerById(req);
    res.send(result);
});

module.exports = router;
