const fs = require('fs');
const path = require('path');
const { UPLAODS_PATH, TEMP_PATH } = require('../config/upload');

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(TEMP_PATH, file),
            path.resolve(UPLAODS_PATH, file)
        );
        return file;
    }

    async deleteFile(fileName) {
        const filePath = path.resolve(UPLAODS_PATH, fileName);
        try {
            await fs.promises.stat(filePath);
        } catch (_error) {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;
