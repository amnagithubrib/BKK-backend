const Joi = require("joi");
const partnersService = require("../services/partnerService");
class partnersController {
    static async getAllpartners(req) {
        try {
            const partners = await partnersService.getAllpartners();
            return { success: true, message: "partners retrieved successfully", data: partners };
        } catch (error) {
            console.log("Error retrieving partners:", error);
            return { success: false, message: "Internal server error", error: error.message };
        }
    }

    static async createAgent(req) {
        try {
            const newAgent = await partnersService.createAgent(req.body);
            return { success: true, message: "partner created successfully", data: newAgent };
        } catch (error) {
            console.log("Error creating partner:", error);
            return { success: false, message: "Failed to create partner", error: error.message };
        }
    }

    static async deleteAgent(req) {
        const { id } = req.params;
        try {
            const deletedAgent = await partnersService.deleteAgentById(id);
            return { success: true, message: "Agent deleted successfully", data: deletedAgent };
        } catch (error) {
            console.log("Error deleting agent:", error);
            return { success: false, message: "Failed to delete agent", error: error.message };
        }
    }

    static async updateAgent(req) {
        const { id } = req.params;
        try {
            const updatedAgent = await partnersService.updateAgentById(id, req.body);
            return { success: true, message: "Agent updated successfully", data: updatedAgent };
        } catch (error) {
            console.log("Error updating agent:", error);
            return { success: false, message: "Failed to update agent", error: error.message };
        }
    }

    static async getAgent(req) {
        const { id } = req.params;
        try {
            const agent = await partnersService.getAgentById(id);
            return { success: true, data: agent };
        } catch (error) {
            console.log("Error retrieving agent:", error);
            return { success: false, message: "Failed to retrieve agent", error: error.message };
        }
    }

    static async getAllAgents(req) {
        try {
            const agents = await partnersService.getAllAgents();
            return { success: true, data: agents };
        } catch (error) {
            console.log("Error retrieving agents:", error);
            return { success: false, message: "Failed to retrieve agents", error: error.message };
        }
    }

    static async createpartner(req) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            password: Joi.number().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return { success: false, message: "Validation error", error: error.details[0].message };
        }

        try {
            const newpartner = await partnersService.createpartner(req.body);
            return { success: true, message: "partner created successfully", data: newpartner };
        } catch (error) {
            console.log("Error creating partner:", error);
            return { success: false, message: "Failed to create partner", error: error.message };
        }
    }

    static async loginpartner(req) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return { success: false, message: "Validation error", error: error.details[0].message };
        }

        try {
            const { token, partner } = await partnersService.loginpartner(req.body);
            return { success: true, message: "Login successful", token, partner };
        } catch (error) {
            console.log("Error during login:", error);
            return { success: false, message: "Internal server error", error: error.message };
        }
    }

    static async registerpartner(req) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().optional()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return { success: false, message: "Validation error", error: error.details[0].message };
        }

        try {
            const newpartner = await partnersService.registerpartner(req.body);
            return { success: true, message: "Signup successful", data: newpartner };
        } catch (error) {
            console.log("Error during signup:", error);
            return { success: false, message: "Internal server error", error: error.message };
        }
    }

    static async getpartnerById(req) {
        const { id } = req.params;
        try {
            const partner = await partnersService.getpartnerById(id);
            if (!partner) {
                return { success: false, message: "partner not found" };
            }
            return { success: true, message: "partner retrieved successfully", data: partner };
        } catch (error) {
            console.log("Error retrieving partner:", error);
            return { success: false, message: "Internal server error", error: error.message };
        }
    }

    static async logoutpartner(req) {
        try {
            const result = await partnersService.logoutpartner();
            return { success: true, message: "Logout successful", result };
        } catch (error) {
            console.log("Error during logout:", error);
            return { success: false, message: "Internal server error", error: error.message };
        }
    }
}

module.exports = partnersController;
