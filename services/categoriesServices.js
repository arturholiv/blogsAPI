const { Categories } = require('../models');

const create = async (categorie) => {
  try {
    const newCategorie = await Categories.create({ ...categorie });

    if (newCategorie) return { code: 201, newCategorie };
  } catch (e) {
    return { code: 500, message: { message: 'internal server error' } };
  }
};

const getAll = async () => {
  try {
    const categories = await Categories.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });
    if (categories) return { code: 200, categories };
  } catch (e) {
    return { code: 500, message: { message: 'internal server error' } };
  }
};

module.exports = {
  create,
  getAll,
};