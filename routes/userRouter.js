const express = require('express');

const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  userExists,
} = require('../middlewares/userMiddlewares');

const route = express();

route.get('/', authMiddleware, userControllers.getAll);
route.get('/:id', authMiddleware, userControllers.getById);
route.post('/', isDisplayNameValid, isEmailValid,
 isPasswordValid, userExists, userControllers.create);

module.exports = route;