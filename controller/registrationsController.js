const Registrations = require("../db/models/registrations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registrationsController = {
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }
            const existingpartner = await Registrations.query().findOne({ email });
            if (existingpartner) {
                return res.status(409).json({ success: false, message: "Email already in use" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newpartner = await Registrations.query().insert({
                name,
                email,
                password: hashedPassword
            });
            if (!newpartner) {
                return res.status(200).json({ success: true, message: "Signup successful" });
            }
            res.status(201).json({ success: true, data: { id: newpartner.id, name: newpartner.name, email: newpartner.email } });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
    async login (req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required." });
            }

            const partner = await Registrations.query().findOne({ email });
            if (!partner) {
                return res.status(401).json({ success: false, message: "No partner found with this email" });
            }
            const isMatch = await bcrypt.compare(password, partner.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: partner.id }, "amna", { expiresIn: "1h" });
            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

module.exports = registrationsController;
