import { prisma } from '../../app.js';

export const readByHardness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: { hardness: req.params.hardness },
    });
    res.json(woods);
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};
