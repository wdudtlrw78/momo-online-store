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
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

router.post('/', (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/shop', (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 50;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  const sortBox = (sort) => {
    Product.find()
      .populate('writer')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          PostSize: productInfo.length,
        });
      });
  };

  switch (req.body.filters) {
    case 1:
      sortBox({ createdAt: -1 });
      break;
    case 2:
      sortBox({ price: 1 });
      break;
    case 3:
      sortBox({ price: -1 });
      break;
    default:
      Product.find()
        .populate('writer')
        .sort({ sold: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({
            success: true,
            productInfo,
            PostSize: productInfo.length,
          });
        });
  }
});

router.post('/shop/category/:categoryId', (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 50;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  const category = Product.findOne({
    category: req.params.categoryId,
  });

  const sortBox = (sort, category) => {
    Product.find(category)
      .populate('writer')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          PostSize: productInfo.length,
        });
      });
  };

  switch (req.body.filters) {
    case 1:
      sortBox({ createdAt: -1 }, category);
      break;
    case 2:
      sortBox({ price: 1 }, category);
      break;
    case 3:
      sortBox({ price: -1 }, category);
      break;
    default:
      Product.find(category)
        .populate('writer')
        .sort({ sold: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({
            success: true,
            productInfo,
            PostSize: productInfo.length,
          });
        });
  }
});

module.exports = router;
