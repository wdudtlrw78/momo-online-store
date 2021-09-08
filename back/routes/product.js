const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Product } = require('../models/Product');
const { send } = require('process');

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
  const limit = req.body.limit ? parseInt(req.body.limit) : 20;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;
  const term = req.body.searchTerm;

  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log('key', key);

      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log('findArgs', findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, PostSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, PostSize: productInfo.length });
      });
  }
});

router.get('/product/:productId', (req, res) => {
  const productIds = req.params.productId;

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

router.post('/product/:productId/reviews', (req, res) => {
  const { rating, comment, nickname, writer } = req.body;

  const productIds = req.params.productId;

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .findOneAndUpdate(
      { _id: { $in: productIds } },
      {
        $push: {
          reviews: {
            nickname,
            rating: Number(rating),
            comment,
            writer,
          },
        },
      },
      { new: true }
    )
    .exec((err, productReview) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, productReview });
    });
});

router.get('/product/:productId/reviews', (req, res) => {
  const productIds = req.params.productId;

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, productReview) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, productReview });
    });
});

module.exports = router;
