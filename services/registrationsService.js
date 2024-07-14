const Registrations = require("../db/models/registrations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registrationsService = {
    async createpartner({ name, email, password }) {
        try {
            const existingpartner = await Registrations.query().findOne({ email });
            if (existingpartner) {
                throw new Error("Email already in use");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newpartner = await Registrations.query().insert({
                name,
                email,
                password: hashedPassword
            });
            return { id: newpartner.id, name: newpartner.name, email: newpartner.email };
        } catch (error) {
            console.error("Error creating registrations:", error);
            throw error;
        }
    },

    async loginpartner({ email, password }) {
        try {
            const partner = await Registrations.query().findOne({ email });
            if (!partner) {
                throw new Error("No partner found with this email");
            }
            const isMatch = await bcrypt.compare(password, partner.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ id: partner.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
};

module.exports = registrationsService;
