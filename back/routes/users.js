const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.checkEmail(req.body.email, function (err, result) {
    if (result !== null) {
      return res.status(403).send('User already exists');
    } else {
      user.save((err) => {
        if (err) return res.send(err);
        return res.status(200).send('ok');
      });
    }
  });
});

module.exports = router;
