const express = require('express');
const { auth } = require('../middleware/auth');
const { Product } = require('../models/Product');
const router = express.Router();
const { User } = require('../models/User');

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    nickname: req.user.nickname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post('/register', async (req, res, next) => {
  const user = new User(req.body);

  user.checkEmail(req.body.email, function (err, result) {
    // 존재하는 이메일이 있는지 확인
    if (result !== null) return res.status(403).send('User already exists');
    user.save((err) => {
      if (err) return res.send(err);
      return res.status(200).json({ success: true });
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.status(403).send('Auth failed, email not found');

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).send('Wrong password');

      // 비밀번호 까지 맞다면 토큰 생성.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          success: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post('/addToCart', auth, (req, res) => {
  //User Collection에 해당 유저의 정보를 가져오기

  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    //가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    // 상품이 이미 있을 때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, 'cart.id': req.body.productId },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true }, // update된 userInfo 결과 값을 받으려면 new: true를 해줘야한다.
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } else {
      // 상품이 이미 있지 않을 때
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

router.get('/removeFromCart', auth, (req, res) => {
  // cart안에 지우려고 한 상품 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: { id: req.query.id },
      },
    },
    { new: true },
    (err, userInfo) => {
      const cart = userInfo.cart;
      const array = cart.map((item) => {
        return item.id;
      });

      // product collection에서 현재 남아있는 상품들의 정보들 가져오기

      Product.find({ _id: { $in: array } })
        .populate('writer')
        .exec((err, productInfo) => {
          if (err) res.status(400).json({ success: false, err });
          return res.status(200).json({
            success: true,
            productInfo,
            cart,
          });
        });
    }
  );
});

module.exports = router;
