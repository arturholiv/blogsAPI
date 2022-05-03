const express = require('express');

const { create } = require('../controllers/blogPostControllers');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  titleValidation,
  contentValidation,
  categoriesValidation,
} = require('../middlewares/blogPostMiddlewares');

const route = express();

route.post('/', authMiddleware, titleValidation, contentValidation, categoriesValidation, create);

module.exports = route;