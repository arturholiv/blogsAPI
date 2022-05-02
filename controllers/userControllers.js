const userServices = require('../services/userServices');

const getAll = async (_req, res) => {
  const result = await userServices.getAll();
  if (result.message) return res.status(result.code).json(result.message);
 
  return res.status(result.code).json(result.users);
 };
const create = async (req, res) => {
  const {
    displayName,
    email,
    password,
    image,
  } = req.body;

  const result = await userServices.create({
    displayName,
    email,
    password,
    image,
  });
  if (result.message) return res.status(result.code).json(result.message);
  return res.status(result.code).json({ token: result.token });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await userServices.getById(id);

  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.user);
};

module.exports = {
  create,
  getAll,
  getById,
};