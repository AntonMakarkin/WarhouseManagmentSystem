const multer = require('multer');

//function for preparing avatar before uploading
const upload = multer({
    limits: {
        fileSize: 1048576
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Пожалуйста, загрузите картинку'));
        }

        cb(undefined, true); //to accept the file
    }
});

module.exports = upload;