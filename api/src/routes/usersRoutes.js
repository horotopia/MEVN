const express = require("express");
const { getUsers } = require("../controllers/usersController");
const { authenticateToken } = require("../middlewares/jwt");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Users'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */

router.get("/", authenticateToken, getUsers);

module.exports = router;
