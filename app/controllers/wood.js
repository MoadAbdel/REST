import { prisma } from '../../app.js';

const addLinks = (wood, req) => ({
  ...wood,
  links: [
    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/woods/${wood.id}` },
    { rel: 'sameHardness', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/woods/${wood.hardness}` },
  ],
});

export const create = async (req, res) => {
  try {
    const pathname = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;
    const data = req.body.datas ? JSON.parse(req.body.datas) : req.body;
    const wood = await prisma.wood.create({
      data: { ...data, image: pathname },
    });
    res.status(201).json(addLinks(wood, req));
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'Une erreur est survenue. Vérifiez que vous avez bien fourni une image et des données valides.' });
  }
};

export const readByHardness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: { hardness: req.params.hardness },
    });
    res.json(woods.map(wood => addLinks(wood, req)));
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods.map(wood => addLinks(wood, req)));
  } catch (error) {
    res.status(500).json({ error: error.message ?? 'An error occurred' });
  }
};
