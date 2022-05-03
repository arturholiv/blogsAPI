const { BlogPosts, PostsCategories, Categories, User } = require('../models');

const internalError = { code: 500, message: { message: 'internal error' } };

const getAll = async () => {
  try {
    const posts = await BlogPosts.findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });

    return { code: 200, posts };
  } catch (e) {
    return { code: 500, message: { message: 'internal error' } };
  }
};

const create = async ({ title, content, userId, categoryIds }) => {
  const postInfo = { title, content, userId };

  try {
    const newPost = await BlogPosts.create({ ...postInfo });
    const promises = categoryIds.map((id) => Categories.findByPk(id));

    const result = await Promise.all(promises);

    const invalidCategory = await result.filter((r) => r === null);

    if (invalidCategory.length >= 1) {
      return { code: 400, message: { message: '"categoryIds" not found' } };
    }

    const postId = newPost.id;

    const p = categoryIds.map((categoryId) => PostsCategories.create({ postId, categoryId }));

    await Promise.all(p);
    return { code: 201, post: { id: postId, userId, title, content } };
  } catch (e) {
    return internalError;
  }
};
module.exports = {
  getAll,
  create,
};