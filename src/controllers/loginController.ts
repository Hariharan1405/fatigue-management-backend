import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  try {
    // Expecting: { username: "<email>", password: "<password>" }
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username (email) and password are required.' });
    }

    const email = String(username).trim().toLowerCase();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Basic password validation (you can tighten rules if desired)
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Find user by email (username is treated as email)
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Do not reveal whether email exists — generic message
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Successful login — return minimal safe user info
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};