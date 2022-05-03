const { User } = require('../models');
const generateJwt = require('../utils/jwtGenerator');

const create = async (user) => {
  try {
    const newUser = await User.create({ ...user });
    if (newUser) {
      const token = generateJwt(newUser.displayName, newUser.password);
      return { code: 201, token };
    }
  } catch (e) {
    // console.log('linha 12', e);
    return { 
      code: 500,
      message: {
      message: 'Internal Server Error',
    } };
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll();

    if (users) return { code: 200, users };
  } catch (e) {
    return { code: 500, message: { message: 'Internal Server Error' } };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user.dataValues.password !== password) {
      return { code: 400, message: { message: 'Invalid fields' } };
    }

    const token = generateJwt(user.displayName, password);

    return { code: 200, token };
  } catch (e) {
    return { code: 400, message: { message: 'Invalid fields' } };
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) return { code: 404, message: { message: 'User does not exist' } };

    delete user.dataValues.password;

    return { code: 200, user };
  } catch (e) {
    return { code: 404, message: { message: 'User does not exist' } };
  }
};

const getIdByName = async (displayName) => {
  try {
    const user = await User.findOne({
      where: {
        displayName,
      },
    });

    return user.dataValues.id;
  } catch (e) {
    return null;
  }
};

module.exports = {
  create,
  getAll,
  login,
  getById,
  getIdByName,
};
