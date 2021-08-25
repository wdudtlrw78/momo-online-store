const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Product } = require('../models/Product');

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
      return res.status(403).send('Image upload failed');
    } else {
      return res.status(200).json({
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

router.post('/', (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err)
      return res.status(400).send('Failed to upload product information');
    return res.status(200).json({ uploadSuccess: true });
  });
});

router.post('/:gender', (req, res) => {
  // product collection 상품 정보들 가져오기

  Product.find().exec((err, productsInfo) => {
    if (err) return res.status(400).send('Failed to get product information.');
    return res.status(200).json({ productsInfo });
  });
});

module.exports = router;
