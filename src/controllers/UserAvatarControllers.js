const DiskStorage = require('../providers/DiskStorage');
const connectDB = require('../database/sqlite');
const AppError = require('../utils/AppError');

class UserAvatarControllers {
    async update(req, res) {
        if (!req.file) {
            throw new AppError('Img not allowed');
        }
        const user_id = req.user_id;
        const avatarFileName = req.file.filename;
        const diskStorage = new DiskStorage();
        const db = await connectDB();
        const user = await db.get('SELECT * FROM users WHERE id = (?)', [
            user_id,
        ]);
        if (!user) {
            throw new AppError('User not found');
        }
        if (user.avatar) {
            diskStorage.deleteFile(user.avatar);
        }
        const fileName = await diskStorage.saveFile(avatarFileName);
        await db.run('UPDATE users SET avatar = (?) WHERE id = (?)', [
            fileName,
            user_id,
        ]);
        res.status(200).json({ avatar: fileName });
    }
}

module.exports = UserAvatarControllers;
