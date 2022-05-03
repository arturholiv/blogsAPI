const postServices = require('../services/blogPostServices');
const userServices = require('../services/userServices');

const getAll = async (req, res) => {
  const result = await postServices.getAll();
  if (result.message) return res.status(result.code).json(result.message);

  return res.status(result.code).json(result.posts);
};

const create = async (req, res) => {
  const { data: { username } } = req.user;
  console.log(req.user);
  const { title, content, categoryIds } = req.body;

  const userId = await userServices.getIdByName(username);

  if (userId) {
    const result = await postServices.create({ title, content, categoryIds, userId });
    if (result.message) return res.status(result.code).json(result.message);

    return res.status(result.code).json(result.post);
  }
};

module.exports = {
  getAll,
  create,
};