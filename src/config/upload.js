const multer = require('multer');
const path = require('path');

const TEMP_PATH = path.resolve(__dirname, '..', '..', 'temp');
const UPLAODS_PATH = path.resolve(TEMP_PATH, 'uploads');

const multerConfig = {
    storage: multer.diskStorage({
        destination: TEMP_PATH,
        filename(req, file, cb) {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        },
    }),
};

module.exports = {
    TEMP_PATH,
    UPLAODS_PATH,
    multerConfig,
};
