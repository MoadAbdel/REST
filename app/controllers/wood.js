import { prisma } from '../../app.js';

export const create = async (req, res) => {
  try {
    const pathname = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;
    const wood = await prisma.wood.create({
      data: {
        ...JSON.parse(req.body.datas),
        image: pathname,
      },
    });
    res.status(201).json(wood);
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};

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
