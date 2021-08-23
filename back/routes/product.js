const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 확장자 추출(.png)
    const basename = path.basename(file.originalname, ext); // 모모
    cb(null, basename + '_' + new Date().getTime() + ext); // 모모151841236.png
  },
});

const upload = multer({ storage: storage }).single('file');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다');
  fs.mkdirSync('uploads');
}

router.post('/image', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(403).send('Upload Failed');
    } else {
      return res.status(200).json({
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

module.exports = router;
