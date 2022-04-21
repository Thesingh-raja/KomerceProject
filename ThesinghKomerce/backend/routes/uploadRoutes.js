import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdir('./uploads/', err => {
      cb(null, './uploads/');
    });
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  console.log(extname, mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

export default router;
