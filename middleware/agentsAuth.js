require("dotenv").config();
const jwt = require("jsonwebtoken");
const agents = require("../db/models/agents");

exports.agentAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Please provide a valid token" });
        }
        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token, "amna");
        const agent = await agents.query().findById(decodedData.id);

        if (!agent) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.agent = agent;

        next();
    } catch (error) {
        console.error("Error authenticating partner:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
// exports.Authorized = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.partner.role)) {
//             return res.status(403).json({ error: "Forbidden: You do not have access to this resource" });
//         }
//         next();
//     };
// };
