const AppError = require('../utils/AppError');
const connectDB = require('../database/sqlite');
const { hash, compare } = require('bcrypt');
const validateRequestBody = require('../utils/validateRequestBody');

class UserControllers {
    async index(_req, res) {
        const db = await connectDB();
        const result = await db.all('SELECT * FROM users');
        const users = result.map((user) => {
            delete user.password;
            return user;
        });
        res.status(200).json({ users });
    }

    async show(req, res) {
        const user_id = req.user_id;
        const db = await connectDB();
        const user = await db.get('SELECT * FROM users WHERE id = (?)', [
            user_id,
        ]);
        if (!user) {
            throw new AppError('User not found');
        }
        delete user.password;
        res.status(200).json(user);
    }

    async create(req, res) {
        const requestedBodyParams = ['name', 'email', 'password'];
        validateRequestBody(requestedBodyParams, req.body);
        const { name, email, password } = req.body;
        const encryptedPassword = await hash(password, 8);
        const db = await connectDB();
        await validateUserEmail(email, db);
        await db.run(
            'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
            [name, email, encryptedPassword]
        );
        res.status(201).json({ success: true });
    }

    async update(req, res) {
        const user_id = req.user_id;
        const db = await connectDB();

        let user = await db.get('SELECT * FROM users WHERE id = (?)', [
            user_id,
        ]);

        if (req.body.email) {
            await validateUserEmail(req.body.email, db, user_id);
        }
        const updateInfosObj = {};
        if (Object.keys(req.body).includes('newPassword')) {
            validateRequestBody(['password'], req.body);
            const passwordIsValid = await compare(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                throw new AppError('Invalid Password');
            }
            updateInfosObj['password = (?)'] = await hash(
                req.body['newPassword'],
                8
            );
        }
        const possibleUpdateInfos = ['name', 'email'];
        possibleUpdateInfos.forEach((key) => {
            const validateKey = Object.keys(req.body).includes(key);
            if (!validateKey) return;
            updateInfosObj[`${key} = (?)`] = req.body[key];
        });
        const updateInfosKeysString = Object.keys(updateInfosObj).join(',');
        await db.run(
            `UPDATE users SET ${updateInfosKeysString}, updated_at = DATETIME('now') WHERE id = (?)`,
            [...Object.values(updateInfosObj), user_id]
        );

        user = await db.get('SELECT * FROM users WHERE id = (?)', [user_id]);
        delete user.password;
        res.status(200).json({ user });
    }

    async delete(req, res) {
        const user_id = req.user_id;
        const db = await connectDB();
        const success = await db.run('DELETE FROM users WHERE id = (?)', [
            user_id,
        ]);
        if (success?.changes === 0) {
            throw new AppError('User not found');
        }
        res.status(204).json();
    }
}

async function validateUserEmail(email, db, user_id = null) {
    const usersExists = await db.get('SELECT * FROM users WHERE email = (?)', [
        email,
    ]);
    if (user_id && +user_id === usersExists?.id) {
        return;
    }
    if (usersExists) {
        throw new AppError('Email is not available');
    }
}

module.exports = UserControllers;
