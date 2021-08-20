const express = require('express');
const { auth } = require('../middleware/auth');
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
          loginSuccess: true,
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

module.exports = router;
