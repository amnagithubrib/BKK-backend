const jwt = require("jsonwebtoken");
const Agents = require("../db/models/agents");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token missing or invalid format" });
        }

        const token = authHeader.split(" ")[1];
        let decodedData;

        try {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        const agent = await Agents.query().findById(decodedData.id);

        if (!agent) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.agent = agent;
        next();
    } catch (error) {
        console.error("Error authenticating agent:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
