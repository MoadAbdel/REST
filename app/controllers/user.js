import bcrypt from 'bcrypt';
import { prisma } from '../../app.js';

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};

export const login = (req, res) => {
  res.send('You are login');
};
