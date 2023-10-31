const { Router } = require('express');
const LoginControllers = require('../controllers/LoginControllers');

const loginRoutes = Router();
const loginControllers = new LoginControllers();

loginRoutes.post('/', loginControllers.login);

module.exports = loginRoutes;
