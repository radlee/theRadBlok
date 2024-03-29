const multer = require('multer');
const path = require('path');

//Multer Config
module.exports = multer ({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp"){
            cb(new Error("File Type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});