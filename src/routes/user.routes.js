const { Router } = require('express');
const multer = require('multer');
const { multerConfig } = require('../config/upload');
const UserControllers = require('../controllers/UserControllers');
const UserAvatarControllers = require('../controllers/UserAvatarControllers');
const authUser = require('../middleweres/authUser');

const userRoutes = Router();
const userControllers = new UserControllers();
const userAvatarControllers = new UserAvatarControllers();
const upload = multer(multerConfig);

userRoutes.post('/', userControllers.create);

userRoutes.use(authUser);
userRoutes.get('/me', userControllers.show);
userRoutes.get('/', userControllers.index);
userRoutes.put('/', userControllers.update);
userRoutes.delete('/', userControllers.delete);
userRoutes.patch(
    '/avatar',
    upload.single('avatar'),
    userAvatarControllers.update
);

module.exports = userRoutes;
