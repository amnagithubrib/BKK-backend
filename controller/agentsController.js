const agents = require("../db/models/agents");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const agentsController = {
    async signup(req, res) {
        try {
            const { number, pin, name } = req.body;
            if (!number || !pin) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }
            const exsistingAgent = await agents.query().findOne({ number });
            if (exsistingAgent) {
                return res.status(409).json({ success: false, message: " already in use" });
            }
            const newAgent = await agents.query().insert({
                number,
                pin,
                name

            });
            if (!newAgent) {
                return res.status(200).json({ success: true, message: "Signup successful" });
            }
            res.status(201).json({ success: true, data: newAgent });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
    async login(req, res) {
        try {
            const { number, pin } = req.body;
            if (!number || !pin) {
                return res.status(400).json({ success: false, message: "number and pin are required." });
            }
            const user = await agents.query().findOne({ number });
            if (!user) {
                return res.status(401).json({ success: false, message: "No user found " });
            }
            const token = jwt.sign({ id: user.id }, "amna", { expiresIn: "1h" });
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

module.exports = agentsController;
