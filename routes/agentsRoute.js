const express = require("express");
const agentsController = require("../controller/agentsController");
const { validateSignup, validateLogin } = require("../middleware/agentsValidation");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: agents signup
 *     tags: [agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 example: 1234567890
 *               pin:
 *                 type: integer
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - number already in use
 */
router.post("/signup", validateSignup, agentsController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: agents login
 *     tags: [agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 example: 1234567890
 *               pin:
 *                 type: integer
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: number and pin are required
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateLogin, agentsController.login);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     tags: [agents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to secret route
 *       500:
 *         description: Internal server error
 */

module.exports = router;
