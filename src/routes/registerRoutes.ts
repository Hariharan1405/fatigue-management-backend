import { Router } from 'express';
import { register } from '../controllers/registerController';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *               - dob
 *               - gender
 *               - phoneNumber
 *               - country
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               dob:
 *                 type: string
 *                 description: Date of birth in DD/MM/YYYY format
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               phoneNumber:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already registered
 */

router.post('/register', register);

export default router;