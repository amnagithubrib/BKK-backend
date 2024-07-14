const Agents = require("../db/models/agents");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AgentService = {
    async createAgent({ number, pin, name = "" }) {
        try {
            const existingAgent = await Agents.query().findOne({ number });
            if (existingAgent) {
                throw new Error("Number already in use");
            }
            const newAgent = await Agents.query().insert({
                number,
                pin,
                name
            });
            return { id: newAgent.id, number: newAgent.number, name: newAgent.name };
        } catch (error) {
            console.error("Error creating Agent:", error);
            throw error;
        }
    },

    async loginAgent({ number, pin }) {
        try {
            const Agent = await Agents.query().findOne({ number });
            if (!Agent) {
                throw new Error("No Agent found with this number");
            }
            const isMatch = (pin === Agent.pin);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ id: Agent.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
};

module.exports = AgentService;
