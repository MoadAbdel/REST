import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};
