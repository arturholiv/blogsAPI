const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const { name } = req.body;

  const result = await categoriesServices.create({ name });

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.newCategorie);
};

const getAll = async (req, res) => {
  const result = await categoriesServices.getAll();

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.categories);
};

module.exports = {
  create,
  getAll,
};