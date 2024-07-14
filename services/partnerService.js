const partners = require("../db/models/partners");
const agents = require("../db/models/agents");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class partnersService {
    static async getAllpartners() {
        try {
            return await partners.query();
        } catch (error) {
            console.log("Error fetching all partners:", error);
            throw error;
        }
    }

    static async createpartner(data) {
        const { name, email, address, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            return await partners.query().insert({ name, email, address, password: hashedPassword });
        } catch (error) {
            console.log("Error creating partner:", error);
            throw error;
        }
    }

    static async createAgent(data) {
        const { number, pin, name } = data;
        // const hashedPin = await bcrypt.hash(pin, 10);
        try {
            return await agents.query().insert({ number, pin, name });
        } catch (error) {
            console.log("Error creating partner:", error);
            throw error;
        }
    }

    static async deleteAgentById(id) {
        try {
            const deletedRows = await agents.query().deleteById(id);
            if (deletedRows === 0) {
                throw new Error(`Agent with id ${id} not found`);
            }
            return { message: `Agent with id ${id} deleted successfully` };
        } catch (error) {
            console.log("Error deleting agent:", error);
            throw error;
        }
    }

    static async updateAgentById(id, data) {
        try {
            const updatedAgent = await agents.query().patchAndFetchById(id, data);
            if (!updatedAgent) {
                throw new Error(`Agent with id ${id} not found`);
            }
            return updatedAgent;
        } catch (error) {
            console.log("Error updating agent:", error);
            throw error;
        }
    }

    static async getAgentById(id) {
        try {
            const agent = await agents.query().findById(id);
            if (!agent) {
                throw new Error(`Agent with id ${id} not found`);
            }
            return agent;
        } catch (error) {
            console.log("Error retrieving agent:", error);
            throw error;
        }
    }

    static async getAllAgents() {
        try {
            return await agents.query();
        } catch (error) {
            console.log("Error retrieving agents:", error);
            throw error;
        }
    }

    static async loginpartner(data) {
        const { email, password } = data;
        try {
            const partner = await partners.query().findOne({ email });
            if (!partner) {
                throw new Error("No partner found with this email");
            }

            const isPasswordValid = await bcrypt.compare(password, partner.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            const secret = "amna";
            const token = jwt.sign({ id: partner.id, role: partner.role }, secret, { expiresIn: "1h" });

            return { token, partner };
        } catch (error) {
            console.log("Error during login:", error);
            throw error;
        }
    }

    static async registerpartner(data) {
        const { name, email, address, password, role = "partner" } = data;
        try {
            const existingUser = await partners.query().findOne({ email });
            if (existingUser) {
                throw new Error("Email already in use");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            return await partners.query().insert({
                name,
                email,
                address,
                password: hashedPassword,
                role
            });
        } catch (error) {
            console.log("Error during signup:", error);
            throw error;
        }
    }

    static async getpartnerById(id) {
        try {
            return await partners.query().findById(id) || null;
        } catch (error) {
            console.log("Error fetching partner by ID:", error);
            throw error;
        }
    }

    static async logoutpartner() {
        return { success: true, message: "Logout successful" };
    }
}

module.exports = partnersService;
