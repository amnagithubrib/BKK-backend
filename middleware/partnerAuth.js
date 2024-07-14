require("dotenv").config();
const jwt = require("jsonwebtoken");
const partners = require("../db/models/partners");

exports.Authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }

        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token, "amna");
        const partner = await partners.query().findById(decodedData.id);
        if (!partner) {
            throw new Error();
        }

        req.partner = partner;

        next();
    } catch (error) {
        console.error("Error authenticating partner:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
