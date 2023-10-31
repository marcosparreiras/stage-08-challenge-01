const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const AppError = require('../utils/AppError');

function authUser(req, _res, next) {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        throw new AppError('Token is missing');
    }
    try {
        const { secret } = authConfig.jwt;
        const data = jwt.verify(token, secret);
        req.user_id = data.id;
        next();
    } catch {
        new AppError('JWT invalid');
    }
}

module.exports = authUser;
