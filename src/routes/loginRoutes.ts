import { Router } from 'express';
import { login } from '../controllers/loginController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username(email) and credentials
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful (returns minimal user info)
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 *      
 */

router.post('/login', login);

export default router;