const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');
const connectDB = require('../database/sqlite');
const AppError = require('../utils/AppError');
const validateResquestBody = require('../utils/validateRequestBody');

class LoginControllers {
    async login(req, res) {
        validateResquestBody(['email', 'password'], req.body);
        const { email, password } = req.body;
        const db = await connectDB();
        const user = await db.get('SELECT * FROM users WHERE email = (?)', [
            email,
        ]);
        if (!user) {
            throw new AppError('Email or password not valid');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new AppError('Email or password not valid');
        }
        const { expiresIn, secret } = authConfig.jwt;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn });

        delete user.password;
        res.status(200).json({ token, user });
    }
}

module.exports = LoginControllers;
