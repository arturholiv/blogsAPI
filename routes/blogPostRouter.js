const express = require('express');

const { create, getAll } = require('../controllers/blogPostControllers');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  titleValidation,
  contentValidation,
  categoriesValidation,
} = require('../middlewares/blogPostMiddlewares');

const route = express();

route.get('/', authMiddleware, getAll);
route.post('/', authMiddleware, titleValidation, contentValidation, categoriesValidation, create);

module.exports = route;