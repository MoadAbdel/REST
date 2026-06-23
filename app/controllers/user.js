import { prisma } from '../../app.js';

export const signup = async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = (req, res) => {
  res.send('You are login');
};
