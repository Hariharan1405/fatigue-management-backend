import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const {
    firstName, lastName, email, phoneNumber, dob,
    gender, password, confirmPassword, country
  } = req.body;

  // Simple validations
  if (!firstName || !lastName || !email || !phoneNumber || !dob || !gender || !password || !confirmPassword || !country) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Parse DD/MM/YYYY
  function parseDOB(dobString: string): Date | null {
    const [day, month, year] = dobString.split('/').map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }
  const birthday = parseDOB(dob);

  // Validate DOB format
  if (!birthday || isNaN(birthday.getTime())) {
    return res.status(400).json({ message: 'Invalid DOB format. Must be DD/MM/YYYY.' });
  }

  // Age >= 18 validation
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  if (age < 18) {
    return res.status(400).json({ message: 'User must be at least 18 years old.' });
  }

  // Password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Email uniqueness
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Persist to DB
  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob: birthday,
    gender,
    country,
    password: hashedPassword
  });

  return res.status(201).json({ message: 'Registration successful!', userId: user.id });
};