const { Router } = require('express');
const UserControllers = require('../controllers/UserControllers');

const userRoutes = Router();
const userControllers = new UserControllers();

userRoutes.get('/', userControllers.index);
userRoutes.post('/', userControllers.create);
userRoutes.get('/:user_id', userControllers.show);
userRoutes.put('/:user_id', userControllers.update);
userRoutes.delete('/:user_id', userControllers.delete);

module.exports = userRoutes;
