const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const nameIsValid = require('../middlewares/categoriesMiddlewares');
const categoriesControllers = require('../controllers/categoriesControllers');

const route = express();

route.post('/', authMiddleware, nameIsValid, categoriesControllers.create);
route.get('/', authMiddleware, categoriesControllers.getAll);

module.exports = route;